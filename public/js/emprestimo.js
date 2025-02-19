async function EmprestarLivro(id_usuario, id_livro) {
    const resposta = await fetch("http://localhost:2200/emprestimos", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id_usuario, id_livro})
    });
    const resultado = await resposta.json();
    alert(resultado.mensagem || "Empréstimo Realizado!");
}