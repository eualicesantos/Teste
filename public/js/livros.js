async function carregarLivros() {
    const resposta = await fetch("http://localhost:2200/livros");
    const livros = await resposta.json();
    let html = "</ul>";
    livros.forEach(livro => {
        html += '<li>${livro.titulo} - ${livro.autor} (${livro.ano})</li>';
    });
    html += "</ul>";
    document.getElementById("livros").innerHTML = html;
}