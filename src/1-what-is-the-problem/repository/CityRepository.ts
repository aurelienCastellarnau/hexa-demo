import { FileService } from "../service/FileService";
import { City } from "../Model/City";

interface Config {
    host: string
}

// intrication des services
// même si la config est dynamisée le testing est rendu compliqué
export class CityRepository {
    private config: Config;
    private fileService: FileService;

    constructor (config: Config) {
        this.config = config;
        this.fileService = new FileService();
    };

    private configValidator = () => {
        if (this.config.host === undefined) {
            throw new Error('config.host is undefined')
        }
    }

    private initFile = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            if (!this.fileService.existsSync(this.config.host)) {
                this.fileService.writeFile(this.config.host, '[]')
                    .then(_ => resolve(true))
                    .catch(err => reject(err));
            } else {
                resolve(true);
            }
        })
    }

    public add = (city: City): Promise<string> => {
        return new Promise((resolve, reject) => {
            this.configValidator();

            this.initFile()
                .then((_) => {
                    this.fetchAll()
                        .then((storageContent: string) => {
                            let parsedContent: any[];
                            try {
                                parsedContent = <any[]> JSON.parse(storageContent);
                                parsedContent.push(city);
                            } catch (err) {
                                reject(err);
                                return;
                            }
                            this.fileService.writeFile(this.config.host, JSON.stringify(parsedContent))
                                .then(city => {
                                    resolve(city)
                                });
                        });
                })
                .catch(err => reject(err));
        })
    }
    
    public fetchAll = (): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            this.configValidator();

            this.fileService.readFile(this.config.host, {})
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    public removeAll = (): Promise<boolean> => {
        return new Promise<boolean>((resolve, reject) => {
            this.configValidator();

            this.fileService.removeFile(this.config.host)
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }
}
