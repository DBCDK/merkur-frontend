#!groovy

def app
def workerNode = "devel10"
def BASE_NAME = 'docker-metascrum.artifacts.dbccloud.dk/merkur-frontend'
def cypressImage = "docker-dbc.artifacts.dbccloud.dk/cypress:latest"
def appName = "merkur-frontend"
def slackChannel = "meta-notifications"

pipeline {
	agent {label workerNode}
    environment {
        IMAGE_TAG = "${env.BRANCH_NAME.toLowerCase()}-${BUILD_NUMBER}"
        IMAGE_NAME = "${BASE_NAME}:${IMAGE_TAG}"
        IMAGE = "${BASE_NAME}:${IMAGE_NAME}"
        DOCKER_COMPOSE_NAME = "compose-${appName}-${BRANCH_NAME}-${BUILD_NUMBER}"
		GITLAB_PRIVATE_TOKEN = credentials("metascrum-gitlab-api-token")
	}
    triggers {
        upstream(upstreamProjects: "Docker-base-node-bump-trigger",
            threshold: hudson.model.Result.SUCCESS)
    }
	options {
		timestamps()
		ansiColor('xterm')
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
                    app = docker.build("${IMAGE}", "--pull --no-cache .")
                }
            }
        }
        stage('verify') {
            steps {
                script {
                    sh "docker pull ${cypressImage}"
                    sh "docker-compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} build"
                    sh "docker-compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} run --rm e2e"
                }
            }
        }
		stage("docker push") {
			when {
				branch "main"
			}
			steps {
				script {
					app.push()
				}
			}
		}
        stage("bump docker tag in merkur-service-secrets") {
			agent {
				docker {
					label workerNode
					image "docker-dbc.artifacts.dbccloud.dk/build-env:latest"
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
	post {
        always {
            sh """
                mkdir -p logs
                docker-compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} logs web > logs/web-log.txt
                docker-compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} logs e2e > logs/e2e-log.txt
                docker-compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} logs wiremock > logs/wiremock-log.txt
                docker-compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} down -v
                docker rmi ${IMAGE}
            """
            archiveArtifacts 'e2e/cypress/screenshots/*, e2e/cypress/videos/*, logs/*'
        }
        failure {
            script {
                if ("${BRANCH_NAME}" == 'main') {
                    slackSend(channel: "${slackChannel}",
                            color: 'warning',
                            message: "${JOB_NAME} #${BUILD_NUMBER} failed and needs attention: ${BUILD_URL}",
                            tokenCredentialId: 'slack-global-integration-token')
                }
            }
        }
        success {
            script {
                if ("${BRANCH_NAME}" == 'main') {
                    slackSend(channel: "${slackChannel}",
                            color: 'good',
                            message: "${JOB_NAME} #${BUILD_NUMBER} completed, and pushed ${IMAGE} to artifactory.",
                            tokenCredentialId: 'slack-global-integration-token')
                }
            }
        }
        fixed {
            script {
                if (BRANCH_NAME == 'main') {
                    slackSend(channel: "${slackChannel}",
                            color: 'good',
                            message: "${JOB_NAME} #${BUILD_NUMBER} back to normal: ${BUILD_URL}",
                            tokenCredentialId: 'slack-global-integration-token')
                }
            }
        }
    }
}
