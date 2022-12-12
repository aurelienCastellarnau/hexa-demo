import { CityController } from "@whatistheproblem/controller/CityController";

const cityController = new CityController();

test('get city by zip code', async () => {
    // Intestable sans réaliser une requête http contre l'application
    // Tester le protocole http est douteu, superflu et engendre une mise en place supplémentaire
    // Les dépendances ne peuvent pas être abstraites, l'appel à l'API .gouv aurait lieu pendant les tests
    await cityController.getByZipcode();
});
