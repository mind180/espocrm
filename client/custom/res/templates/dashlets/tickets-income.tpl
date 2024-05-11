<div class="tickets-income-container">
    <div></div>
    <div class="income-result">
        <div></div>
        <div class="" style="padding-right: 5px">
            <span class="text-success" style="font-size: 1.5em">₴</span>
            <span class="text-3em text-success text-bold">{{ income }}</span>
        </div>
        <div class="income-result-details">
            <div style="color: var(--state-info-text); margin-bottom: -5px;">
                {{ incomeCash }}
                <span style="font-size: 0.7em">(готівка)<span>
            </div>
            <div style="color: var(--state-info-text);">
                {{ incomeIban }}
                <span style="font-size: 0.7em">(iban)<span>
            </div>
        </div>
    </div>
    <div></div>
</div>