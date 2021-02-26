# Projektplan

## 1. Projektbeskrivning (Beskriv vad sidan ska kunna göra).
- Skapa konto.
- Logga in.
- Skapa Projekt.
- Skapa Projektpost.
- Visa alla projekt och specifika posts.
## 2. Vyer (visa bildskisser på dina sidor).
![Home](md_images/bloggMainsite.png)
![Home Logged In](md_images/bloggMainsiteLogged.png)
![Log in](md_images/bloggLogIn.png)
![Sign Up](md_images/bloggSignup.png)
![Create project](md_images/bloggProjekt.png)
![Create post](md_images/bloggPost.png)
## 3. Databas med ER-diagram (Bild på ER-diagram).
![Blogg-applikation databas](md_images/bloggER-Diagram.png)
## 4. Arkitektur (Beskriv filer och mappar - vad gör/innehåller de?).

## 5. Restful Routes
URL(routes) | HTTP Verb | Action | Förklaring
--- | --- | --- | ---
/ | GET | start | "hem" sidan
/signup | GET | signup | visa formulär som lägger till användare
/signup | POST | create | lägg till användare
/login | GET | login | visa formulär som loggar in en användare
/login | POST | login | logga in användare
/logout | POST | logout | logga ut nuvarande användare
/user/:username | GET | index | visa alla projekt från en user (visas även för nyinloggad)
/user/:username/account | GET | show | visa användarens info (endast för användaren som är inloggad)
/projects | GET | index | visa alla projekt
/projects/new | GET | new | visa formulär som lägger till ett projekt
/projects/new | POST | create | lägg till ett projekt
/projects/:projectTitle | GET | show | visa ett projekt
/projects/:projectTitle/edit | GET | edit | visa (ifyllt) edit-formulär för ett projekt
/projects/:projectTitle/update | POSTS | update | uppdatera ett projekt
/projects/:projectTitle/posts | GET | index | visa alla artiklar från ett projekt
/posts/new | GET | new | visa formulär som lägger till en artikel
/posts/new | POSTS | create | lägg till en artikel
/posts/:postTitle | GET | show | visa en artikel från ett projekt
/posts/:postTitle/edit | GET | edit | visa (ifyllt) edit-formulär för en artikel i ett projekt
/posts/:postTitle/update | POST | update | uppdatera en artikel
/tag/:tag | GET | index | visa alla projekt och deras artiklar med den taggen

## 6. Att göra
- Fixa skapa projekt
- Fixa signup
- Fixa login
- Fixa se account -> se alla project och deras posts, ska kunna slänga posts på detta vis.
- Fixa Visa projects
- Fixa Visa "preview" av posts
- Fixa Visa Hela posts
- Fixa välja bild från lista istället för att ladda upp varje gång