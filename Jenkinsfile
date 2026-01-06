pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "cicd-marriage"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    credentialsId: 'git-auth',
                    url: 'https://github.com/Sufiyan1806/CICD-marriage.git'
            }
        }

        stage('Stop Existing Containers') {
            steps {
                sh 'docker compose down || true'
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful'
        }
        failure {
            echo '❌ Deployment failed'
        }
    }
}
