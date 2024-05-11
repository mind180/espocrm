define('custom:views/dashlets/tickets-income', ['views/dashlets/abstract/base'],  function (Dep) {
    return Dep.extend({
        name: 'Tickets Income',
        template: 'custom:dashlets/tickets-income',

        setup: function() {
            this.income = 0;
            this.incomeCash = 0;
            this.incomeIban = 0;
            this.eventId = this.getOption('eventId');

            this.wait(
                this.fetchEventIncome(this.eventId)
            );
        },

        fetchEventIncome: async function(eventId) {
            try {
                const eventIncomeRes = await fetch(`api/v1/Event/${eventId}/income`);
                const eventIncome  = await eventIncomeRes.json();
                console.log(eventIncome);
                this.income = eventIncome.income;
                this.incomeCash = eventIncome.incomeCash;
                this.incomeIban = eventIncome.incomeIban;

                return eventIncome;
            } catch (error) {
                console.error(error);
            }
        },

        data: function() {
            return {
                income: this.income.toLocaleString('en'),
                incomeCash: this.incomeCash.toLocaleString('en'),
                incomeIban: this.incomeIban.toLocaleString('en')
            }
        }
    })
});