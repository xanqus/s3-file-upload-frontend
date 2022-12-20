pipeline {
    agent any

    stages {
        stage('connect test') {
            steps{
                sh """
                echo connect test
                echo github webhook test
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

         stage('Docker run') {
            agent any
            steps {
                sh 'docker ps -f sbs-community-frontend -q | xargs --no-run-if-empty docker container stop'
                sh 'docker container ls -a -f name=sbs-community-frontend -q | xargs -r docker container rm -f'
                sh 'docker images --no-trunc --all --quiet --filter="dangling=true" | xargs --no-run-if-empty docker rmi'
                sh 'docker run -d --name sbs-community-frontend-dev -p 8181:80 --restart unless-stopped sbs-community-frontend:latest'
            }
        }


    }
}