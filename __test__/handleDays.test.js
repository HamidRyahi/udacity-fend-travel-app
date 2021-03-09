import { countdown, lengthOfTrip } from "../src/client/js/handleDays"
describe("Both functions should be defined", () => {
    test("Testing the countdown() function", () => {
           expect(countdown).toBeDefined();
    })
    test("Testing the lengthOfTrip() function", () => {
        expect(lengthOfTrip).toBeDefined();
 })
});
