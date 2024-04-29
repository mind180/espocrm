define('custom:ticket-send-email', ['action-handler'], function (Dep) {

    return Dep.extend({

        actionSendEmail: function (data, e) {
            //revers value to trigger formula script and send email
            const inverseTrigger = !this.view.model.attributes.sendEmailTrigger;

            this.view.model.set("sendEmailTrigger", inverseTrigger);
            this.view.model.set("emailWasSend", true);
            this.view.model.save()
                .then(res => {
                    Espo.Ui.notify('Квиток відправлено', 'success', 2000);
                })
                .catch(error => this.handleError(error));
        },

        initSendEmail: function () {
            
        },

        handleError: function(error) {
            Espo.Ui.notify('Помилка при відправці', 'error', 2000);
            console.log(error);
        }
    });
 });