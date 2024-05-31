import { getCountry } from "@/api/host-query";
import Pagination from "@/components/pagination";
import { Country, CountryDetails } from "@/type/host";
import { useEffect, useState } from "react";
import { Table } from 'antd';

Component.displayName = "HostPage";


export function Component() {
    const columns = [
        {
            dataIndex: 'athlete1',
            key: 'athlete1',
        },
        {
            dataIndex: 'athlete2',
            key: 'athlete2',
        },
        {
            dataIndex: 'athlete3',
            key: 'athlete3',
        },
    ];

    const medalColumns = [
        {
            title: 'Gold',
            dataIndex: 'gold',
            key: 'gold',
        },
        {
            title: 'Silver',
            dataIndex: 'silver',
            key: 'silver',
        },
        {
            title: 'Bronze',
            dataIndex: 'bronze',
            key: 'bronze',
        },
    ];

    // Colonnes de la table des pays
    const countryColumns = [
        {
            title: '',
            dataIndex: 'country1',
            key: 'country1',
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: '',
            dataIndex: 'country2',
            key: 'country2',
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: '',
            dataIndex: 'country3',
            key: 'country3',
            render: (text: string) => <span>{text}</span>,
        },
    ];


    const prepareDataForTable = (athletes: string[]) => {
        const data = [];
        for (let i = 0; i < athletes.length; i += 3) {
            data.push({
                key: i / 3,
                athlete1: athletes[i] || '',
                athlete2: athletes[i + 1] || '',
                athlete3: athletes[i + 2] || '',
            });
        }
        return data;
    };






    const AthleteTable = ({ athletes }: { athletes: string[] }) => {
        const data = prepareDataForTable(athletes);

        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 7 }}
                    style={{ width: '100%' }}
                />
            </div>
        );
    };

    const prepareMedalDataForTable = (medals: { gold: number; silver: number; bronze: number }) => {
        return [{
            key: 0,
            gold: medals.gold,
            silver: medals.silver,
            bronze: medals.bronze,
        }];
    };

    // Composant MedalTable
    const MedalTable: React.FC<{ medals: { gold: number; silver: number; bronze: number } }> = ({ medals }) => {
        const data = prepareMedalDataForTable(medals);

        return (
            <div>
                <Table
                    columns={medalColumns}
                    dataSource={data}
                    pagination={false}
                    style={{ width: '100%' }}
                />
            </div>
        );
    };
    const [infodet, setInfodet] = useState(false); // Ajoutez votre état pour infodet
    const [selectedCountry, setSelectedCountry] = useState(''); // État pour le pays sélectionné

    const [paysdata, setData] = useState<CountryDetails | null>(null);
    const handleCountryClick = (countryName: string) => {
        setSelectedCountry(countryName);
        setInfodet(true);
    };
    useEffect(() => {
        if (selectedCountry) {
            const fetchData = async () => {
                const response = await fetch(`https://backend-hackathon-test2.vercel.app/country_details?country=${selectedCountry}`);
                const data = await response.json();
                console.log(data);
                setData(data);
            };

            fetchData();
        }
    }, [selectedCountry]);

    const [page, setPage] = useState(0);
    const itemsPerPage = 10;
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;

    const { data, isPending, isError, error } = getCountry(start, end);


    // Fonction pour préparer les données des pays
    const prepareCountryDataForTable = (countries: Country[]): any[] => {
        const data: any[] = [];
        for (let i = 0; i < countries.length; i += 3) {
            data.push({
                key: i / 3,
                country1: countries[i]?.country_name || '',
                country2: countries[i + 1]?.country_name || '',
                country3: countries[i + 2]?.country_name || '',
            });
        }
        return data;
    };

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Une erreur est survenue: {error.message}</div>;
    }
    const countryData = data ? prepareCountryDataForTable(data) : [];
    return (
        <div>
            {infodet ? (
                <div>
                    <h2>les details de {selectedCountry}</h2>
                    <div>
                        <h2>JO Organiser:</h2>
                        {paysdata && paysdata.hostedGames.length > 0 ? (
                            <ul>
                                {paysdata.hostedGames.map((game, index) => (
                                    <li key={index}>{game}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Aucun JO organiser</p>
                        )}
                    </div>
                    <div>
                        <h2>Athletes:</h2>
                        {paysdata && paysdata.athletes.length > 0 ? (
                            <AthleteTable athletes={paysdata.athletes} />
                        ) : (
                            <p>Aucun athletes</p>
                        )}
                    </div>

                    <div>
                        <h2>Medailles</h2>
                        {paysdata && paysdata.medals ? (
                            <MedalTable medals={paysdata.medals} />
                        ) : (
                            <p>Aucune médaille</p>
                        )}
                    </div>
                    <button onClick={() => setInfodet(false)}>Retour</button>
                </div>
            ) : (
                <div>
                    <Table
                        columns={countryColumns}
                        dataSource={countryData}
                        pagination={{ pageSize: 10 }}
                        style={{ width: '100%' }}
                        showHeader={false}
                        onRow={(record) => ({
                            onClick: (event) => {
                                const { innerText: countryName } = event.target as HTMLElement;
                                handleCountryClick(countryName);
                            },
                        })}
                    />
                </div>
            )}
        </div>
    );
};
