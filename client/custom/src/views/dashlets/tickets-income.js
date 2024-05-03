define('custom:views/dashlets/tickets-income', ['views/dashlets/abstract/base'],  function (Dep) {
    return Dep.extend({
        name: 'Tickets Income',
        template: 'custom:dashlets/tickets-income',

        setup: function() {
            this.income = 0;
            this.incomeCash = 0;
            this.incomeIBAN = 0;
            this.events = { total: 0, list: [] };
            this.eventId = this.getOption('eventId');

            this.wait(
                this.fetchTickets(this.eventId)
            );
        },

        fetchEvents: async function() {
            const eventsCollection = await this.getCollectionFactory().create('Event');
            this.events = await eventsCollection.fetch();

            console.log(this.events);
        },

        fetchTickets: async function(eventId) {
            try {
                const ticketsCollection = await this.getCollectionFactory().create('Ticket');
                if (eventId) {
                    ticketsCollection.where = [
                        {
                            "type": "equals",
                            "attribute": "eventId",
                            "value": eventId,
                        },
                        {
                            "type": "equals",
                            "attribute": "status",
                            "value": "paid",
                        }
                    ];
                }
                
                const tickets = await ticketsCollection.fetch();
                this.income = this.sumTickets(tickets.list);
                this.incomeCash = this.sumTickets(
                    tickets.list.filter(ticket => ticket.paymentMethod === 'cash')
                );
                this.incomeIBAN = this.sumTickets(
                    tickets.list.filter(ticket => ticket.paymentMethod === 'iban')
                );

                console.log(tickets);
            } catch (error) {
                console.error(error);
            }
        },

        sumTickets: function(tickets) {
            let sum = 0;
            tickets.forEach(ticket => sum += ticket.price);
            return sum; 
        },

        data: function() {
            return {
                events: this.events.list,
                income: this.income.toLocaleString('en'),
                profit: this.incomeCash.toLocaleString('en'),
                expenses: this.incomeIBAN.toLocaleString('en')
            }
        }
    })
});