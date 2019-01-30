import mainComponent from "./main.component"

beforeEach(angular.mock.module(mainComponent))

let ctrl

beforeEach(angular.mock.inject(($rootScope, $componentController) => {
    const $scope = $rootScope.$new()
    ctrl = $componentController("mainComponent", { $scope })
}))

describe("main component", () => {
    it("should be defined", () => {
        expect(ctrl).toBeDefined()
    })

    it("should get response from api", inject(function($http, $httpBackend) {
        $httpBackend.when('GET', 'http://data.fixer.io/api/latest?access_key=82e09d1233f77857ac7d07e824a8bee1').respond(200);

        $http.get('http://data.fixer.io/api/latest?access_key=82e09d1233f77857ac7d07e824a8bee1');

        expect($httpBackend.flush);
    }))

    it("should calculate currency rates", () => {
        expect(ctrl.calculateRate({ amount: 1, selectedTo: "USD", selectedFrom: "USD" })).toEqual(1)
    })
})