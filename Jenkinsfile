pipeline {
    agent any

    stages {
        stage('connect test') {
            steps{
                sh """
                echo connect test
                """
            }
        }
        stage('React Build') {
            agent {
                docker {
                    image 'node:18.12.1-alpine'
                }
            }
            steps {
                sh 'npm install'
                sh 'CI=false npm run build'
            }
        }

        stage('Docker build') {
            agent any
            steps {
                sh 'cp /root/config/nginx/nginx.conf nginx.conf'
                sh 'docker build -t sbs-community-frontend:latest .'
            }
        }

    }
}