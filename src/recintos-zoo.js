class RecintosZoo {

    analisaRecintos(tipoAnimal,quantidade) {
        const recintos = [
            { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{ animal: "Macaco", quantidade: 3 }] },
            { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: ["savana", "rio"], tamanhoTotal: 7, animaisExistentes: [{ animal: "Gazela", quantidade: 1 }] },
            { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: [{ animal: "Leão", quantidade: 1 }] }
        ]
        const animal = {
            LEAO: { tamanho: 3, bioma: ["savana"], carnivoro: true },
            LEOPARDO: { tamanho: 2, bioma: ["savana"], carnivoro: true },
            CROCODILO: { tamanho: 3, bioma: ["rio"], carnivoro: true },
            MACACO: { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
            GAZELA: { tamanho: 2, bioma: ["savana"], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false }
        }

        if (!animal.hasOwnProperty(tipoAnimal)) {
            return {erro: "Animal inválido"}
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return {erro: "Quantidade inválida"}
        }

        const animalInfo = animal[tipoAnimal]
        const tamanhoNecessario = animalInfo.tamanho * quantidade
        const recintosViaveis = []

        for (const recinto of recintos) {
            const espacoOcupado = recinto.animaisExistentes.reduce((acc, animalExistente) => {
                const animalEspaco = animal.tamanho * animalExistente.quantidade
                return acc + animalEspaco
            }, 0)

            let espacoLivre = recinto.tamanhoTotal - espacoOcupado

            if (espacoLivre >= tamanhoNecessario && animalInfo.bioma.some(b => Array.isArray(recinto.bioma) ? recinto.bioma.includes(b) : recinto.bioma === b)) {
                if (animalInfo.carnivoro && recinto.animaisExistentes.length > 0) {
                    const todaMesmaEspecie = recinto.animaisExistentes.every(animalExistente => animalExistente.animal.toUpperCase() == tipoAnimal)
                        if (!todaMesmaEspecie) {
                            continue
                        }
                } else {
                    const hipopotamoPresente = recinto.animaisExistentes.some(a => a.animal === "HIPOPOTAMO")
                    if (hipopotamoPresente && !(recinto.bioma.includes("savana") && recinto.bioma.includes("rio"))) {
                        continue
                    }
                    if (recinto.animaisExistentes.length > 0) {
                        espacoLivre -= 1
                        
                    }
                    if (tipoAnimal === "MACACO" && recinto.animaisExistentes.length === 0) {
                        continue
                    }
                    
                }



                recintosViaveis.push({
                    numero: recinto.numero,
                    espacoLivre,
                    tamanhoTotal: recinto.tamanhoTotal
                })

            }
        }
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" }
        }

        recintosViaveis.sort((a, b) => a.numero - b.numero)

        return {
            recintosViaveis: recintosViaveis.map(recinto =>
                `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre} total: ${recinto.tamanhoTotal})`
            )
        }
    }
}
export { RecintosZoo as RecintosZoo };
