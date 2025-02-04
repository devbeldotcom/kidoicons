# Kido Icons (1.0.2)

---

---

'KidoIcons' is pixel perfect open source font icon pack with 2500+ icons. Crafted specially for those who wish to make stunning designs.

## Installation

Run the below command

```
npm i kidoicons
```

And import the module as shown

```
import { KidoIcon } from 'kidoicons'
```

## Usage

#### Using CSS

1. Include link tag inside document `<head>` tag

   1.1. Using Local StyleSheat

   ```html
   <head>
     <link rel="stylesheet" href="kidoicons.css" />
     <!--or-->
     <link rel="stylesheet" href="kidoicons.min.css" />
   </head>
   ```

   1.2. Using Remote CDN with your favourite CDN provider

   ```html
   <head>
     <link
       rel="stylesheet"
       href="https://cdn.jsdelivr.net/npm/kidoicons@1.0.2/dist/css/kidoicons.min.css"
     />
     <!--or-->
     <link
       rel="stylesheet"
       href="https://cdn.jsdelivr.net/npm/kidoicons@1.0.2/dist/css/kidoicons.css"
     />
     <!--or-->
     <link
       rel="stylesheet"
       href="https://unpkg.com/kidoicons@1.0.2/dist/css/kidoicons.min.css"
     />
     <!--or-->
     <link
       rel="stylesheet"
       href="https://unpkg.com/kidoicons@1.0.2/dist/css/kidoicons.css"
     />
   </head>
   ```

2. Add icons by using classname `kd-` for outlined icons, `kdf-` for filled icons and `kdl-` for logo icons followed by icon name as shown below

   ```html
   <i class="kd-user"></i>
   <i class="kdf-home"></i>
   <i class="kdl-github"></i>
   ```

#### Using Custom Web Component(Works only KidiIcons V:1.0.1 and above)

1.  Add script tag of kidoIcons JS file into your page

    ```html
    <script src="https://cdn.jsdelivr.net/npm/kidoicons@1.0.2/dist/js/kidoicons.js"></script>
    <!--or-->
    <script src="https://cdn.jsdelivr.net/npm/kidoicons@1.0.2/dist/js/kidoicons.min.js"></script>
    <!--or-->
    <script src="https://unpkg.com/kidoicons@1.0.2/dist/js/kidoicons.js"></script>
    <!--or-->
    <script src="https://unpkg.com/kidoicons@1.0.2/dist/js/kidoicons.min.js"></script>
    ```

2.  Add icons by using `kido-icon` tag and pass icon name as `name` attribute as shown below
    ```html
    <kido-icon name="home"></kido-icon>
    ```
    By default it will add outlined icon. You can use `type` attribute to specify the type of icons you want to add['filled' for filled & 'logo' for logo]
    ```html
    <kido-icon name="user" type="filled"></kido-icon>
    <kido-icon name="youtube" type="logo"></kido-icon>
    <!--Optionally you can add type="outlined" for outlined icons-->
    <kido-icon name="folder" type="outlined"></kido-icon>
    ```
    Or you can add different types of icons without `type` attribute by providing type of icon to `name` attribute as shown below
    ```html
    <kido-icon name="kd-user"></kido-icon>
    <kido-icon name="kdf-heart"></kido-icon>
    <kido-icon name="kdl-chrome"></kido-icon>
    ```
3.  Register desired name as icon tag name. Ex:
    ```html
    <script>
      KidoIcon.register("your-name");
      <!--here you can replace your-name with desired string-->
    </script>
    ```
    Now you can add icon using tag name you registered
    ```html
    <your-name name="battery"></your-name>
    <your-name name="anchor" type="filled"></your-name>
    <your-name name="youtube" type="logo"></your-name>
    ```
    - Tag name must contain atleast one hyphen sign/dash `-` in it. Ex: `tag-name`.
    - Tag name must be in lowercase. This is to prevent conflict with future HTML elements, which are case sensitive.
    - Tag name should not start with a number. Names should start with letter or an underscore`_`.
    - Avoid using special characters other than dash `-` and underscore `_`;
4.  You can modify the visibility of icon by using attributes. KidoIcons have support for the following attributes.
    ```html
    <kido-icon
      name="arrow"
      type="filled"
      color="red"
      size="16px"
      flipX
      flipY
    ></kido-icon>
    ```
    - for `name` attributes can use icon name (`gear`) or type specific (`kdl-meta`)
    - `type` attribute accepts either of 'outlined' for normal/outlined icons, 'filled' for filled icons, 'logo' for logo icons. You can avoid using `type` attribute for noraml/outlined icons or if you specify the icon type within name attribute as discussed above(`kdf-home`).
    * Use `size` attribute to change icon size. It accepts any size formats(px, rem, em etc) ex: `size:="20px"`.
      - You can also use pre-defined values(xs, sm, md, lg) ex: `size="lg"`\*\*
    - To change color of icons you can use `color` attribute.
      It accepts any color formats(red, #ff0000, rgba(255, 255, 255, 1)).
    * Use `filpX` and `flipY` to flip the icon.
5.  Instead of web component you can use any HTML tag with icon attribute as class name.(Even if you are using JavaScript import with script tag or importing library directly)
    ```html
    <i class="kd-adjust"></i>
    <i class="kdf-bot"></i>
    <i class="kdl-dell"></i>
    ```

---

---

---

# We consistantly working to make our library mush functional and professional.

---

---
