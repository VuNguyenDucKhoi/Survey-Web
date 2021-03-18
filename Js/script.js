var html = document.getElementById("header");
    html.insertAdjacentHTML("beforeend",` 
    <a href="#" class="logo">Logo</a>
        <ul>
            <li><a href="index.html" onclick="toggle()">Trang chủ</a></li>
            <li><a href="form.html" onclick="toggle()">Tạo phiếu</a></li>
            <li><a href="#services" onclick="toggle()">Services</a></li>
            <li><a href="#portfolio" onclick="toggle()">Portfolio</a></li>
            <li><a href="#team" onclick="toggle()">Team</a></li>
            <li><a href="#contact" onclick="toggle()">Contact</a></li>
        </ul>
        <div class="toggle" onclick="toggle()"></div>`)