const fs = require('fs').promises;

async function escreverArquivoCallback(nomeArquivo, dados) {
    try {
        console.log(`Escrevendo dados no arquivo ${nomeArquivo}...`)
        fs.writeFile(nomeArquivo, dados)
        console.log(`Dados escritos no arquivo ${nomeArquivo} com sucesso.`)
    } catch (error) {
        console.error(`Erro ao escrever dados no arquivo ${nomeArquivo}:`, error)
    }
}

async function lerArquivoCallback(nomeArquivo) {
    try {
        console.log(`Lendo dados do arquivo: ${nomeArquivo}`)
        fs.readFile(nomeArquivo, 'utf-8')
        console.log(`Dados lidos do arquivo ${nomeArquivo}`)

    } catch (error) {
        console.error(`Erro ao ler dados do arquivo ${nomeArquivo}`, error)
    }
}

async function getPokemonDataWithCallbacks() {
    try {
        var arrayPokemon = [];
        console.log("Aguardando retorno da Poke API")
        const api = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await api.json();

        for (row in data.results) {
            const dadosPokemon = await fetch(data.results[row].url);
            const dadosPokemonJson = await dadosPokemon.json();
            const pokemonInfo = {
                nome: dadosPokemonJson.name,
                tipos: dadosPokemonJson.types.map(type => type.type.name),
                peso: dadosPokemonJson.weight,
                altura: dadosPokemonJson.height,
                num_dex: dadosPokemonJson.order,
                sprite: dadosPokemonJson.sprites.front_shiny,
            }
            arrayPokemon.push(pokemonInfo);
        }
        await escreverArquivoCallback('pokemon.json', JSON.stringify(arrayPokemon));

    } catch (error) {
        console.error("Erro ao obter dados do pokemon", error)
    }
}

getPokemonDataWithCallbacks();
