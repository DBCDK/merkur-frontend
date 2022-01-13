#!groovy

def workerNode = "devel10"
def BASE_NAME = 'docker-io.dbc.dk/merkur-frontend'

pipeline {
	agent {label workerNode}
    environment {
        IMAGE_TAG = "${env.BRANCH_NAME.toLowerCase()}-${BUILD_NUMBER}"
        IMAGE_NAME = "${BASE_NAME}:${IMAGE_TAG}"
		GITLAB_PRIVATE_TOKEN = credentials("metascrum-gitlab-api-token")
	}
    triggers {
        upstream(upstreamProjects: "Docker-base-node-bump-trigger",
            threshold: hudson.model.Result.SUCCESS)
    }
	options {
		timestamps()
		disableConcurrentBuilds()
	}
	stages {
        stage('Clear workspace') {
            steps {
                deleteDir()
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    ansiColor("xterm") {
                        sh """
                            ./build.sh
                            ./build.sh docker
                           """
                    }
                }
            }
        }
        stage('verify') {
            steps {
                sh "./test.sh"
                junit testResults: 'target/reports/test-result*.xml'
            }
        }
		stage("docker push") {
			when {
				branch "main"
			}
			steps {
				script {
					docker.image(IMAGE_NAME).push()
				}
			}
		}
        stage("bump docker tag in merkur-service-secrets") {
			agent {
				docker {
					label workerNode
					image "docker.dbc.dk/build-env:latest"
					alwaysPull true
				}
			}
			when {
				branch "main"
			}
			steps {
				script {
					sh """
                        set-new-version services/merkur-frontend.yml ${env.GITLAB_PRIVATE_TOKEN} metascrum/merkur-frontend-secrets  ${env.IMAGE_TAG} -b metascrum-staging
                     """
				}
			}
		}
	}
}
