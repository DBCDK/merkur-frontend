#!groovy
// ------- Dependency-track library ---------
// Import `generateSbomNpm()` and `dependencyTrackGate()`
@Library('dependency-track')

def app
def workerNode = "devel12"
def BASE_NAME = 'docker-metascrum.artifacts.dbccloud.dk/merkur-frontend'
def cypressImage = "docker-dbc.artifacts.dbccloud.dk/cypress:old-202621"
def appName = "merkur-frontend"
def slackChannel = "team-x-notice"
def gitMainBranch = 'main'

// ------- Environment variables ---------
// Dependency track environment variables
// MANDATORY: Dependency track environment vars
// // DT_TEAM_NAME: The name of your team. Should be the same across your projects
def DT_TEAM_NAME = "team-x"
// // DT_PROJECT_TYPE: Should probably be javascript, but we can change this, if it should be necessary
def DT_PROJECT_TYPE = "javascript" // Currently, "python" and "java" are also available for dbc's dependency-track
// // OUTPUT_FOLDER: The folder where you want to temporarily place your sbom.json and vex.json files while you build the project.
def OUTPUT_FOLDER = "./dependency-track-folder" // Can be something else, e.g. `./target`
// // SBOM_TYPE: The type of SBOM_TYPE application that the project is. Most often `application`
def SBOM_TYPE = "application" // type: `application | library | framework`

// // DT_PROJECTS: The projects that should be scanned.
// //              Most of the time it should just be the root-project: def DT_PROJECTS=[[folder: "."]]
// Handle each project/subproject seperately (nice if there are different SBOM_TYPEs, DT_PROJECT_TYPEs, or OUTPUT_FOLDERs)
//   You can write these projects out more explicitly if you like
// MANDATORY: folder, outputFolder, teamName, projectType, sbomType
def DT_PROJECTS = [
  [folder: "."],
].collect { project ->
  [
   folder: project.folder,
   sbomType: project.sbomType ?: SBOM_TYPE,
   teamName: project.teamName ?: DT_TEAM_NAME,
   projectType: project.projectType ?: DT_PROJECT_TYPE,
   outputFolder: project.outputFolder ?: OUTPUT_FOLDER
  ]
}

pipeline {
	agent {label workerNode}
    environment {
        IMAGE_TAG = "${env.BRANCH_NAME.toLowerCase()}-${BUILD_NUMBER}"
        IMAGE_NAME = "${BASE_NAME}:${IMAGE_TAG}"
        DOCKER_COMPOSE_NAME = "compose-${appName}-${BRANCH_NAME}-${BUILD_NUMBER}".toLowerCase()
		GITLAB_PRIVATE_TOKEN = credentials("metascrum-gitlab-api-token")
	}
    triggers {
        cron( env.BRANCH_NAME == gitMainBranch ? 'H 2 * * 7' : '' )
        upstream(
            upstreamProjects: env.BRANCH_NAME == gitMainBranch ? 'Docker-base-node-bump-trigger' : '',
            threshold: hudson.model.Result.SUCCESS
        )
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
        stage("Supply-chain gate") {
          agent {
            docker {
              label workerNode
              image "docker-dbc.artifacts.dbccloud.dk/dbc-node:node25"
              alwaysPull true
            }
          }
          steps {
            script {
              // Iterate over each folder
              for (def project : DT_PROJECTS) {
                dir(project.folder) {
                  generateSbomNpm(
                    sbomType: project.sbomType,
                    outputFolder: project.outputFolder
                  )
                  dependencyTrackGate(
                    projectBom:  "${project.outputFolder}/sbom.json",
                    projectTeam: project.teamName,
                    projectType: project.projectType,
                    *:(fileExists("${project.outputFolder}/vex.json") ? [projectVex: "${project.outputFolder}/vex.json"] : [:])
                  )
                }
              }
            }
          }
        }
        stage('Build') {
            steps {
                script {
                    app = docker.build("${IMAGE_NAME}", "--pull --no-cache .")
                }
            }
        }
        stage('verify') {
            steps {
                script {
                    sh "docker pull ${cypressImage}"
                    sh "docker compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} build"
                    sh "docker compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} run --rm e2e"
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
                docker compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} logs web > logs/web-log.txt
                docker compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} logs e2e > logs/e2e-log.txt
                docker compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} logs wiremock > logs/wiremock-log.txt
                docker compose -f docker-compose-cypress.yml -p ${DOCKER_COMPOSE_NAME} down -v
                docker rmi ${IMAGE_NAME}
            """
            archiveArtifacts 'e2e/cypress/screenshots/*, e2e/cypress/videos/*, logs/*'
        }
        failure {
            script {
                if (BRANCH_NAME == 'main') {
                    slackSend(channel: "${slackChannel}",
                            color: 'warning',
                            message: "${JOB_NAME} #${BUILD_NUMBER} failed and needs attention: ${BUILD_URL}",
                            tokenCredentialId: 'slack-global-integration-token')
                }
            }
        }
        success {
            script {
                if (BRANCH_NAME == 'main') {
                    slackSend(channel: "${slackChannel}",
                            color: 'good',
                            message: "${JOB_NAME} #${BUILD_NUMBER} completed, and pushed ${IMAGE_NAME} to artifactory.",
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
