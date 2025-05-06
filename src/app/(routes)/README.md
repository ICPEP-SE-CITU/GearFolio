# Routing Guide

```
(routes)/  # Grouped routes for logical organization
 ├── dashboard/  # Dashboard-specific routes
 │   ├── page.js     # Dashboard main page component
 │   └── layout.js   # Dashboard-specific layout
 ├── profile/    # Profile-related routes
 │   ├── page.js     # Profile page component
 │   └── layout.js   # Profile page layout
 ├── [variable]/    # Profile-related routes
 │   └── page.js   # Dynamic Routing
 └── page.js     # Root/home page
```

THE NAMES OF FOLDER OF ``page.js`` server as the name of the route.  
ADD MORE FOLDERS FOR MORE PAGES  
NAG ADD KOG PORTFOLIO AND LOGIN_SIGNUP PAGE AWA SA FOLDER  
ADD LAYOUT.JS FILE IF LAHI JUD IMO LAYOUT PERO USUALLY ANG ROOT LAYOUT (./app/layout.js) IS ENOUGH SO NO NEED MOST OF THE TIME  
AS FOR LINKING ANG IMO GI CALL IS ANG FOLDEDRE NAME SO /dashboard, /login_signup, /portfolio, /profile  

sample code:
```
<Link
   href="/dashboard"
>
<Link
   href="/login_singup"
>
<Link
   href="/portfolio"
>
<Link
   href="/profile"
>
```
