Ce guide vous explique comment installer Naia OS depuis une clé USB bootable vers votre disque dur, du démarrage jusqu'à l'exécution de l'application Naia.

## Ce dont vous avez besoin

- Une clé USB (8 Go ou plus) sur laquelle l'ISO de Naia OS a été flashée
- Un PC fabriqué au cours des 10 dernières années (la plupart sont compatibles)
- Au moins 64 Go d'espace disque

> Téléchargez l'ISO depuis la [page de téléchargement](/fr/download).

---

## Créer une clé USB bootable

Téléchargez l'ISO de Naia OS depuis la [page de téléchargement](/fr/download), puis écrivez-la sur une clé USB.

Nous recommandons **[balenaEtcher](https://etcher.balena.io)** — il fonctionne sur Windows, macOS et Linux.

1. Téléchargez et ouvrez balenaEtcher.
2. Cliquez sur **Flash from file** et sélectionnez l'ISO de Naia OS.
3. Cliquez sur **Select target** et choisissez votre clé USB.
4. Cliquez sur **Flash!** et attendez la fin de l'opération.

> **Avertissement** : Cela effacera toutes les données de la clé USB. Sauvegardez d'abord les fichiers importants.

## Démarrer depuis l'USB et lancer l'installation

Pour savoir comment démarrer depuis l'USB, consultez **[2. Naia OS Live USB](/fr/manual/live-usb)**.

Vous verrez une icône **Installer sur le disque dur** en haut à gauche du bureau. Double-cliquez dessus pour ouvrir l'assistant d'installation.

## Étape 1 : Langue et Clavier

![Écran de bienvenue](/images/manual/iso-install/01-welcome.png)

Sélectionnez votre langue et la disposition de votre clavier préférées. Utilisez la boîte de recherche pour filtrer (par exemple, tapez « français »). Cliquez sur **Suivant**.

## Étape 2 : Date et Heure

![Date et heure](/images/manual/iso-install/02-datetime.png)

La date, l'heure et le fuseau horaire sont automatiquement détectés. Ajustez si nécessaire. Cliquez sur **Suivant**.

## Étape 3 : Méthode d'installation

![Méthode d'installation](/images/manual/iso-install/03-installation-method.png)

Sélectionnez le disque cible. **« Utiliser tout le disque »** est l'option recommandée — cela effacera toutes les données existantes sur le disque sélectionné. Cliquez sur **Suivant**.

> **Avertissement** : « Utiliser tout le disque » effacera tout sur le lecteur sélectionné. Sauvegardez d'abord les fichiers importants.

## Étape 4 : Configuration du stockage

![Configuration du stockage](/images/manual/iso-install/04-storage.png)

Vous pouvez choisir de chiffrer votre disque. Si vous n'êtes pas sûr, laissez cette option décochée et continuez. Cliquez sur **Suivant**.

## Étape 5 : Créer un compte

![Créer un compte](/images/manual/iso-install/05-create-account.png)

Saisissez votre nom, nom d'utilisateur et mot de passe (6 caractères ou plus).

![Compte rempli](/images/manual/iso-install/05b-account-filled.png)

Une fois que tous les champs affichent des coches vertes, cliquez sur **Suivant**.

## Étape 6 : Vérifier et installer

![Vérification](/images/manual/iso-install/06-review.png)

Vérifiez vos paramètres — assurez-vous que la langue, le fuseau horaire et les informations du compte sont corrects. Cliquez sur **Effacer les données et installer** pour commencer.

## Progression de l'installation

![Installation en cours](/images/manual/iso-install/07-installing.png)

L'installateur progresse à travers quatre étapes : Configuration du stockage, Installation du logiciel, Configuration du système et Finalisation.

![Progression](/images/manual/iso-install/08-installing-progress.png)

> Cela prend généralement **10–30 minutes** selon votre matériel. L'étape « Installation du logiciel » est la plus longue — l'écran peut sembler inchangé pendant cette étape. C'est normal.

## Installation terminée

![Terminé](/images/manual/iso-install/09-complete.png)

Vous verrez « Installation réussie. » Cliquez sur **Quitter le bureau live**, puis redémarrez. Retirez la clé USB avant de redémarrer.

## Premier démarrage — Connexion

![Connexion](/images/manual/iso-install/10-login.png)

Après le redémarrage, l'écran de connexion apparaît. Entrez le mot de passe que vous avez créé lors de l'installation.

## Premier démarrage — Application Naia

![Application Naia](/images/manual/iso-install/12-naia-app.png)

Après la connexion, **Naia démarre automatiquement**. Lors de la première exécution, choisissez votre fournisseur d'IA préféré. Sélectionnez un fournisseur, configurez votre API Key, et vous êtes prêt.

Bienvenue sur Naia OS !