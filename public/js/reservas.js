async function carregarReservas() {
    const resposta = await fetch("http://localhost:2200/reservas");
    const reservas = await resposta.json();
    let html = "<ul>";
    reservas.forEach(reserva => {
        html += `<li>Livro: ${reserva.livro.titulo} - Reservado por: ${reserva.usuario.nome} (Data: ${new Date(reserva.data_reserva).toLocaleDateString()})</li>`;
    });
    html += "</ul>";
    document.getElementById("reservas").innerHTML = html;
}
