import { CityService } from "@whatistheproblem/service/city/CityService";

const cityService = new CityService();

test('get by zip code', async () => {
    await cityService.getByZipCode("75003")
        .then((city) => {
            expect(city.code).toBe(0);
            expect(city.nom).toBe("Paris");
        })
        .catch((err) => {
            expect(err).toBeFalsy();
        });
});
