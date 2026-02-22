Cet onglet vous permet de surveiller la santé, les statistiques et les journaux en temps réel du démon OpenClaw Gateway fonctionnant en arrière-plan de Naia.

![Diagnostics Tab](diagnostics-tab.png)

## Aperçu du statut
Dans la grille supérieure, vous pouvez vérifier les métriques clés de la passerelle :
- **Passerelle** : Statut de connexion actuel (🟢 OK, 🔴 Erreur)
- **ID du Nœud** : L'identifiant unique de la passerelle
- **Durée de fonctionnement** : Durée depuis laquelle le système est en cours d'exécution
- **Plateforme / Arch** : Informations sur l'OS et l'architecture
- **Requêtes / Jetons totaux** : Requêtes et jetons traités aujourd'hui
- **Coût total** : Coût total encouru

## Diffusion des journaux en temps réel
Le panneau inférieur diffuse des journaux internes détaillés directement depuis la passerelle.
- **Démarrer les journaux / Arrêter les journaux** : Vous pouvez démarrer ou arrêter le flux de journaux à tout moment.
- Si le système rencontre un problème ou si une intégration de messagerie échoue, vous pouvez trouver la cause détaillée dans ces journaux.

## Liste des méthodes RPC
Tout en bas de l'onglet, une liste de toutes les méthodes d'appel de procédure distante (RPC) prises en charge est affichée sous forme de balises, vous permettant de vérifier rapidement les fonctionnalités actuellement prises en charge par la passerelle.