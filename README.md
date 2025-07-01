# taskmanagement
Application de gestion de tâches


## Équipe & Rôles

- 👩‍💻 Lisa Moula — Frontend (React)
- 👨‍💻 Khaoula Chetioui — Backend (Node/Express)/ Tests 
- ⚙️ Mohamed Elyes Bahouri — DevOps, CI/CD 


---

# I - Configuration du projet

---

### Gitignore

- On commence par créer un `.gitignore` dans `node_modules` dans le dossier frontend et backend et y mettre "*"
  


### Protection de la branche main

- On rajoute une règle de protection de la branche `main` dans les paramètres du repo GitHub.
- On active les options suivantes :
    - Require a pull request before merging
    - Require status checks to pass (on ajoute ici nos différents test comme dans le screen ci-dessous)

![alt text](image-4.png)

### Invitation des membres

- On invite les membres du groupe dans le repo GitHub.
  ![alt text](image-2.png)



# Tests et qualité
tests End-to-End (E2E) avec Selenium


# Tests End-to-End (E2E) avec Selenium

Ce document présente une vue d'ensemble des différents tests E2E implémentés dans le projet, en utilisant Selenium WebDriver avec JavaScript.

## Prérequis

* Node.js installé sur votre machine
* ChromeDriver installé et disponible dans le PATH
* Application lancée localement à l'adresse : `http://localhost:3000`

## Installation des dépendances

Pour installer les dépendances nécessaires, exécutez la commande suivante :

```bash
npm install selenium-webdriver chromedriver jest
```

## Lancer les tests

Pour exécuter les tests, utilisez la commande :

```bash
npm run test:e2e
```

## Description des tests

### 1. `login.test.js`

#### Scénarios couverts :

* **Connexion avec des identifiants valides**

  * Vérifie que l'utilisateur peut se connecter avec succès.
  * Vérifie que l'utilisateur accède bien au tableau de bord après connexion.

* **Connexion avec des identifiants invalides**

  * Vérifie qu'un message d'erreur s'affiche en cas d'échec de connexion.

### 2. `task.test.js`

#### Scénario couvert :

* **Connexion et redirection vers le dashboard**

  * Vérifie que l'utilisateur est correctement redirigé vers le tableau de bord après une connexion réussie.

### 3. `create-task.test.js`

#### Scénario couvert :

* **Création d'une nouvelle tâche**

  * Connexion à l'application
  * Ouverture du formulaire de création de tâches
  * Remplissage et soumission du formulaire
  * Vérification que la nouvelle tâche apparaît bien dans la liste des tâches

## Structure d'un test typique

Chaque fichier de test suit une structure similaire :

```javascript
describe('Description du test', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  test('Description du scénario', async () => {
    // Actions du test
  });
});
```

## Points importants

* **Timeout** : chaque attente explicite dispose d'un timeout ajustable (généralement réglé à 10 secondes).
* **Messages d'erreurs explicites** : en cas d'échec, des messages clairs sont fournis pour faciliter le débogage.

# Tests d'Intégration API avec Jest et Supertest

Ce document présente une documentation claire et complète sur les tests d'intégration des API utilisateur et tâches utilisant Jest et Supertest.

## Prérequis

* Node.js installé
* Application backend démarrée

## Installation des dépendances

Pour installer les dépendances nécessaires, exécutez :

```bash
npm install jest supertest
```

## Lancement des tests

Exécutez la commande suivante pour lancer les tests d'intégration :

```bash
npm run test:integration
```

Assurez-vous que cette commande est définie dans votre `package.json` :

```json
"scripts": {
  "test:integration": "jest tests/integration"
}
```

## Description des tests

### Scénarios couverts :

#### 1. Inscription d'un nouvel utilisateur

* Vérifie que l'utilisateur peut s'inscrire correctement.
* Vérifie la présence du token JWT dans la réponse.

#### 2. Connexion de l'utilisateur

* Vérifie que l'utilisateur peut se connecter avec les identifiants valides.
* Vérifie que la connexion retourne bien un token JWT.

#### 3. Création d'une tâche

* Vérifie que la tâche peut être créée avec un token valide.
* Vérifie que les données retournées correspondent bien aux données envoyées.

#### 4. Accès à une tâche créée

* Vérifie que l'utilisateur peut accéder à la tâche créée précédemment.

## Structure d'un test typique

Chaque fichier suit généralement cette structure :

```javascript
const request = require('supertest');
const app = require('../backend/server');

describe('Description des tests', () => {
  let token;

  test('Description du scénario', async () => {
    const res = await request(app)
      .post('/api/route')
      .send({ /* données du test */ });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('propriétéAttendues');
  });
});
```

## Points importants

* **Gestion des tokens JWT :** Les tokens obtenus après authentification sont réutilisés dans les tests suivants pour authentifier les requêtes.
* **Gestion des identifiants dynamiques :** Les identifiants générés lors de la création de ressources (tâches) sont stockés pour être réutilisés.


# Tests d'API pour les routes `/api/tasks`

Ce document fournit une documentation claire et détaillée des tests d'intégration pour les routes liées aux tâches (`/api/tasks`) en utilisant Jest et Supertest.

## Prérequis

* Node.js installé
* Serveur backend démarré et opérationnel
* Une base de données active et configurée

## Installation des dépendances

Installez les dépendances nécessaires avec :

```bash
npm install jest supertest
```

## Exécution des tests

Lancez les tests avec la commande suivante :

```bash
npm run test:tasks
```

Assurez-vous que cette commande soit définie dans `package.json` :

```json
"scripts": {
  "test:tasks": "jest tests/tasks"
}
```

## Scénarios des tests

### 1. Récupérer toutes les tâches

* **Méthode** : `GET`
* **Route** : `/api/tasks`
* **Description** : Vérifie que la liste des tâches est retournée avec succès.

### 2. Créer une nouvelle tâche

* **Méthode** : `POST`
* **Route** : `/api/tasks`
* **Description** : Vérifie la création d'une nouvelle tâche en envoyant les informations requises et valide que la tâche créée possède un identifiant et les attributs spécifiés.

### 3. Mettre à jour une tâche existante

* **Méthode** : `PUT`
* **Route** : `/api/tasks/:id`
* **Description** : Vérifie la mise à jour d'une tâche existante en changeant son statut.

### 4. Récupérer une tâche spécifique

* **Méthode** : `GET`
* **Route** : `/api/tasks/:id`
* **Description** : Vérifie la récupération des détails d'une tâche spécifique via son identifiant.

### 5. Supprimer une tâche

* **Méthode** : `DELETE`
* **Route** : `/api/tasks/:id`
* **Description** : Vérifie la suppression d'une tâche existante.

## Structure générale d'un test

Chaque test utilise une structure similaire à :

```javascript
describe('Description des tests', () => {
  let token;

  beforeAll(async () => {
    // Connexion et récupération du token JWT
  });

  test('Description du scénario', async () => {
    const res = await request(app)
      .method('/api/route')
      .set('Authorization', `Bearer ${token}`)
      .send({ /* données */ });

    expect(res.statusCode).toBe(expectedStatus);
    expect(res.body).toHaveProperty('expectedProperty');
  });
});
```


---



# II - ESLINT

---

### Installation

- On configure eslint avec la commande suivante dans le repo (`backend` et `frontend`) :

```bash
npm init @eslint/config
```

- Pour tester on fait :

```bash
npx eslint .
```

- On fix les différents bug trouvé comme on peut voir dans cette image :
  ![alt text](image-1.png)

### GitHub Actions

- On ajoute dans les `package.json` des scripts pour lancer eslint dans le dossier `backend` et `frontend` :

```json
"scripts": {
"lint": "eslint ."
}
```

- On crée un fichier `.github/workflows/ci.yml`, dans lequel on ajoute le code pour configurer github Actions.

- Une fois le code push, on peut voir que le workflow s'exécute.
 ![alt text](image.png)

### Bonus
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
test ne passe pas mais fonctionnel : 
![alt text](image-3.png)
