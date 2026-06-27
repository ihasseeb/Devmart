# HTML & Web Development Complete Reference

Yeh DevMart project ke liye HTML, Forms, Attributes, aur Semantic tags ka complete study material hai.

## 1. Semantic Tags
Semantic tags woh hain jo meaning bhi batate hain browser aur developers ko!

- **`<header>`**: Page ya section ka upar wala hissa
- **`<nav>`**: Navigation links
- **`<main>`**: Page ka main content
- **`<section>`**: Ek topic ka group
- **`<article>`**: Independent content (blog post, product)
- **`<aside>`**: Side content (sidebar, ads)
- **`<footer>`**: Page ka nichla hissa

### DevMart Structure Example
```html
<body>
  <header>        <!-- Top bar -->
    <nav>         <!-- Navbar -->
  </header>

  <main>          <!-- Main content -->
    <section>     <!-- Hero section -->
    <section>     <!-- Products section -->
    <aside>       <!-- Filters sidebar -->
  </main>

  <footer>        <!-- Bottom bar -->
</body>
```

## 2. Non-Semantic Tags
Yeh tags sirf container hain — koi meaning nahi batate!

- **`<div>`**: Block level container — naya line leta hai
- **`<span>`**: Inline container — same line mein rehta hai

```html
<!-- div — block -->
<div>Main box</div>

<!-- span — inline, text ke andar use hota hai -->
<p>Mera naam <span style="color:red">Haseebi</span> hai</p>
```

## 3. Basic Elements (Text, Lists & Media)
- **`<h1>` se `<h6>`**: Headings ke liye. `<h1>` sabse bada, `<h6>` sabse chota.
- **`<p>`**: Paragraph likhne ke liye.
- **`<ul>` aur `<li>`**: Unordered list (bullet points) banane ke liye.
- **`<a>`**: Links banane ke liye (Anchor tag).
- **`<img>`**: Images dikhane ke liye.

## 4. Attributes
Tags ke andar extra information dene ke liye attributes use hote hain!

- `id`: Ek unique naam
- `class`: CSS styling ke liye
- `src`: Image ya script ka path
- `href`: Link ka address
- `alt`: Image na load ho toh text
- `placeholder`: Input mein hint
- `disabled`: Button band karo
- `required`: Form submit na ho bina is field ke
- `type`: Input ka type (text, password, email)
- `target`: Link kahan khule (e.g., `_blank` for new tab)
- `style`: Directly inline CSS

## 5. Forms & Inputs
Forms se user se data lete hain! Main tags: `<form>`, `<input>`, `<button>`, `<label>`, `<select>`, `<textarea>`.

### Common Input Types
- `text`: Normal text
- `email`: Email validation
- `password`: Hidden text
- `number`: Sirf numbers
- `checkbox`: Multiple select
- `radio`: Single select
- `file`: File upload
- `submit`: Form submit
- `reset`: Form clear

```html
<form action="/submit" method="POST">
  <label for="name">Naam:</label>
  <input type="text" id="name" name="name" placeholder="Apna naam likho" required>
  
  <button type="submit">Submit</button>
</form>
```

## 6. Table Tags
Data ko rows aur columns mein dikhane ke liye. Main tags hain: `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>` (row), `<th>` (heading), `<td>` (data).

```html
<table border="1">
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Laptop</td>
      <td>Rs. 80,000</td>
    </tr>
  </tbody>
</table>
```

## 7. Meta Tags
`<meta>` tags `head` section ke andar aate hain. Yeh SEO, page description aur responsive viewport set karne ke liye use hote hain.

```html
<head>
  <title>DevMart</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="DevMart - Best online store">
</head>
```
