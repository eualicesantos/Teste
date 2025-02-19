async function carregarAvaliacoes() {
    const resposta = await fetch("http://localhost:2200/avaliacoes");
    const avaliacoes = await resposta.json();
    let html = "<ul>";
    avaliacoes.forEach(avaliacao => {
        html += `<li>Livro: ${avaliacao.livro.titulo} - Avaliado por: ${avaliacao.usuario.nome} 
                 (Nota: ${avaliacao.nota}/5, Comentário: "${avaliacao.comentario}")</li>`;
    });
    html += "</ul>";
    document.getElementById("avaliacoes").innerHTML = html;
}
