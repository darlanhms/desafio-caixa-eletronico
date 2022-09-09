const withdrawInput = document.getElementById('withdrawValue');
const withdrawButton = document.getElementById('withdraw');
const withdrawnNotesText = document.getElementById('withdrawnNotes');

// notas possíveis já ordenadas da maior pra menor
const possibleCashNotes = [100, 50, 10, 5, 1];

window.onload = () => {
    withdrawButton.addEventListener('click', () => {
        if (!withdrawInput.value || withdrawInput.value === '0') {
            alert('Informe o valor a ser sacado.');
            return;
        }

        let withdrawValue = parseInt(withdrawInput.value);

        // objeto para armazenar a quantidade de notas de cada valor para informar posteriormente
        const cashNotesToBeWithdrawn = {
            100: 0,
            50: 0,
            10: 0,
            5: 0,
            1: 0,
        }

        while (withdrawValue > 0) {
            // buscar uma nota que tenha valor igual ou menor que o valor de saque
            const suppliedCashNote = possibleCashNotes.find(cashNoteValue => withdrawValue >= cashNoteValue);

            if (suppliedCashNote) {
                // adicionar a nota a ser sacada
                cashNotesToBeWithdrawn[suppliedCashNote] += 1;

                withdrawValue -= suppliedCashNote;
            } else {
                // evitar looping infinito para casos que o valor das notas não batem corretamente (apenas por garantia)
                withdrawValue = 0;
            }
        }

        /**
         * Montar texto para a exibição
         */
        let withdrawnNotesTexts = [];
        for (const cashNote in cashNotesToBeWithdrawn) {
            const withdrawnNotesQuantity = cashNotesToBeWithdrawn[cashNote];

            if (withdrawnNotesQuantity) {
                const isPlural = withdrawnNotesQuantity > 1;

                if (isPlural) {
                    withdrawnNotesTexts.push(`${withdrawnNotesQuantity} notas de $${cashNote}`);
                } else {
                    withdrawnNotesTexts.push(`${withdrawnNotesQuantity} nota de $${cashNote}`);
                }
            }
        }

        withdrawnNotesText.innerHTML = `Você sacou ${withdrawnNotesTexts.join(", ")}`;
    })
}