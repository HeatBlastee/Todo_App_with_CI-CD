pipeline {
  agent any

  environment {
    DOCKER_COMPOSE_VERSION = '1.29.2'
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/your-username/todo-app.git'
      }
    }

    stage('Build Docker Images') {
      steps {
        script {
          sh 'docker-compose build'
        }
      }
    }

    stage('Run Containers') {
      steps {
        script {
          sh 'docker-compose up -d'
        }
      }
    }
  }

  post {
    always {
      echo 'Cleaning up...'
      sh 'docker system prune -f'
    }
  }
}
