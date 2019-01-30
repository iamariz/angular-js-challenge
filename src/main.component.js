import angular from "angular"
import template from "./main.html"

class MainController {


    /* @ngInject */
    constructor($http) {
        this.http = $http;
        this.toCurrencies = {
            'USD': 1.142994,
            'PKR': 159.716293,
            'ALL': 124.620644
        };
        this.formObj = {};
        this.availableToCurrencies = [];
        this.availableFromCurrencies = [];
        this.final = 0;
        this.showResult = false;
        this.getCurrencies();
    }

    getCurrencies() {
        this.http.get('http://data.fixer.io/api/latest?access_key=82e09d1233f77857ac7d07e824a8bee1')
            .then(res => {
                this.toCurrencies = res.data.rates;
                this.getCurrenciesForSelectOptions(this.toCurrencies);
            })
    }

    onSubmit(formObj) {
        if (formObj.amount > 0 && formObj.selectedFrom != "" && formObj.selectedFrom != undefined && formObj.selectedTo != "" && formObj.selectedTo != undefined) {
            this.final = this.calculateRate(formObj);
        } else {
            alert("Check all fields");
        }
    }

    calculateRate(formObj) {
        var from = this.toCurrencies[formObj.selectedFrom];
        var to = this.toCurrencies[formObj.selectedTo];
        var amount = formObj.amount;
        var base = to / from;
        var result = amount * base;
        this.showResult = true;
        return result;
    }

    getCurrenciesForSelectOptions(obj) {
        this.availableToCurrencies = Object.keys(obj);
        this.availableFromCurrencies = this.availableToCurrencies;
    }
}

const component = {
    controller: MainController,
    template
}

export default angular.module("app.main", [])
    .component("mainComponent", component)
    .name