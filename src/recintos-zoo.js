class RecintosZoo {

    analisaRecintos() {
        const recintos = [
            { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{ animal: "Macaco", quantidade: 3 }] },
            { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: "savana" && "rio", tamanhoTotal: 7, animaisExistentes: [{ animal: "Gazela", quantidade: 1 }] },
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

        function isAnimalValido(tipo) {
            return animal.hasOwnProperty(tipo)
        }

        function isQuantidadeValida(quantidade) {
            return Number.isInteger(quantidade) && quantidade > 0
        }

        function isInvalidoAnimal(tipo, quantidade) {
            if (!isAnimalValido(tipo)) {
                return { erro: "Animal inválido" }
            }

            if (!isQuantidadeValida(quantidade)) {
                return { erro: "Quantidade inválida" }
            }
        }

        const animalInfo = this.animais[tipo]
        const tamanhoNecessario = animalInfo.tamanho * quantidade
        const recintosViaveis = []

        for (const recinto of this.recintos) {
            const espacoOcupado = recinto.animaisExistentes.reduce((acc, animal) => {
                const animalEspaco = this.animail[animal.especie].tamanho * animal.quantidade
            return acc + animalEspaco
            }, 0)

            const espacoLivre = tamanhoTotal - espacoOcupado

            if(espacoLivre >= tamanhoNecessario && animalInfo.bioma.includes(recinto.bioma)) {
                if (animalInfo.carnivoro){
                    if (recinto.animaisExistentes.length > 0){
                        continue
                    }
                }
            }
    }


}

export { RecintosZoo as RecintosZoo };
