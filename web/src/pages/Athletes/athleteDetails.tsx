import { getOneAthlete } from "@/api/host-query";
import { Card, Image } from "antd";
import { useParams } from "react-router";


export function AthleteDetails() {
    const { fullName } = useParams();

    if (!fullName) return null;

    const { data, isLoading, isError } = getOneAthlete(fullName);

    if (isLoading || !data) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    const cardTitle = <span style={{ color: '#d5c480' }}>Athlete ID: {data.Athlete_ID}</span>;

    console.log(data);

    return (
        <div>
            <Card title={cardTitle} style={{ boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <p style={styleText}>Full Name :</p>
                            <p style={styleText}>Country:</p>
                            <p style={styleText}>Discipline:</p>
                            <p style={styleText}>Highest Medal:</p>
                            <p style={styleText}>Best Medal Game:</p>
                            <p style={styleText}>Event:</p>
                        </div>
                        <div style={{ marginLeft: 25 }}>
                            <p style={styleText}>{data.Athlete}</p>
                            <p style={styleText}>{data.Country}</p>
                            <p style={styleText}>{data.Discipline}</p>
                            <p style={styleText}>{data.Highest_Medal}</p>
                            <p style={styleText}>{data.Game}</p>
                            <p style={styleText}>{data.Event_Name}</p>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', border: 'solid 5px', borderColor: '#efc75e', borderRadius: 15 }}>
                            <Image preview={false} width={180} src="https://sok.se/images/18.38cec6a017e6704813516192/1642494480072/Puckel.Felix.Elofsson_685x695.jpg" />
                        </div>
                        <Image style={{ marginLeft: 70 }} width={50} src="/assets/images/medal.png" />
                    </div>
                </div>
            </Card>
        </div>
    );
}


export const styleText = {
    fontFamily: 'Poppins',
    fontSize: 16
};
