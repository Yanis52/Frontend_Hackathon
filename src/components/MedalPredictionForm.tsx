import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Card } from 'antd';
const { Option } = Select;

interface PredictionData {
    Country: string;
    sports: number;
    events: number;
    game_part: number;
    prec_game_medal: number;
    prec_game_gold: number;
    prec_game_silver: number;
    prec_game_bronze: number;
}

const countryPresets: { [key: string]: PredictionData } = {
    USA: { Country: 'USA', sports: 6632, events: 740, game_part: 27, prec_game_medal: 1976, prec_game_gold: 757, prec_game_silver: 660, prec_game_bronze: 559 },
    France: { Country: 'France', sports: 4294, events: 647, game_part: 28, prec_game_medal: 588, prec_game_gold: 172, prec_game_silver: 187, prec_game_bronze: 229 },
    China: { Country: 'China', sports: 2288, events: 495, game_part: 12, prec_game_medal: 644, prec_game_gold: 282, prec_game_silver: 193, prec_game_bronze: 169 },
    Germany: { Country: 'Germany', sports: 5429, events: 627, game_part: 25, prec_game_medal: 1137, prec_game_gold: 343, prec_game_silver: 383, prec_game_bronze: 411 },
    UK: { Country: 'United Kingdom', sports: 4527, events: 622, game_part: 28, prec_game_medal: 744, prec_game_gold: 237, prec_game_silver: 253, prec_game_bronze: 254 },
    Japan: { Country: 'Japan', sports: 3073, events: 562, game_part: 23, prec_game_medal: 439, prec_game_gold: 152, prec_game_silver: 128, prec_game_bronze: 159 },
    Australia: { Country: 'Australia', sports: 3175, events: 532, game_part: 26, prec_game_medal: 457, prec_game_gold: 149, prec_game_silver: 136, prec_game_bronze: 172 },
    Canada: { Country: 'Canada', sports: 2824, events: 555, game_part: 26, prec_game_medal: 253, prec_game_gold: 59, prec_game_silver: 85, prec_game_bronze: 109 },
    Italy: { Country: 'Italy', sports: 3581, events: 563, game_part: 27, prec_game_medal: 480, prec_game_gold: 167, prec_game_silver: 138, prec_game_bronze: 175 },
    Brazil: { Country: 'Brazil', sports: 1504, events: 389, game_part: 23, prec_game_medal: 143, prec_game_gold: 38, prec_game_silver: 39, prec_game_bronze: 66 },
};

const countryFlags: { [key: string]: string } = {
    USA: '🇺🇸',
    France: '🇫🇷',
    China: '🇨🇳',
    Germany: '🇩🇪',
    UK: '🇬🇧',
    Japan: '🇯🇵',
    Australia: '🇦🇺',
    Canada: '🇨🇦',
    Italy: '🇮🇹',
    Brazil: '🇧🇷',
};

const MedalPredictionForm: React.FC = () => {
    const [formData, setFormData] = useState<PredictionData | null>(null);
    const [result, setResult] = useState<{ gold: number; silver: number; bronze: number } | null>(null);
    const [form] = Form.useForm();

    const handleCountryChange = (country: string) => {
        setFormData(countryPresets[country]);
        setResult(null); // Réinitialiser le résultat lorsque le pays change
        form.setFieldsValue(countryPresets[country]); // Mettre à jour les valeurs du formulaire
    };

    const handleChange = (changedValues: any, allValues: any) => {
        setFormData(allValues);
    };

    const handleSubmit = async () => {
        console.log("Form submitted with data:", formData); // Log form data

        try {
            const response = await fetch('http://https://backend-hackathon-test2.vercel.app/predict_medals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la prédiction des médailles');
            }

            const data = await response.json();
            console.log("Prediction result:", data); 
            setResult(data);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1>Medal Prediction Form</h1>
            <Row gutter={[16, 16]}>
                {Object.keys(countryPresets).map(country => (
                    <Col span={12} key={country}>
                        <Button
                            style={{ width: '100%' }}
                            onClick={() => handleCountryChange(country)}
                        >
                            {countryFlags[country]} {country}
                        </Button>
                    </Col>
                ))}
            </Row>
            {formData && (
                <Card style={{ marginTop: '20px' }}>
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={formData}
                        onValuesChange={handleChange}
                        onFinish={handleSubmit}
                    >
                        <Form.Item name="Country" label="Country">
                            <Select defaultValue={formData.Country} disabled>
                                {Object.keys(countryPresets).map(country => (
                                    <Option key={country} value={country}>
                                        {countryFlags[country]} {country}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="sports" label="Sports">
                            <Input disabled style={{ color: 'gray' }} />
                        </Form.Item>
                        <Form.Item name="events" label="Events">
                            <Input disabled style={{ color: 'gray' }} />
                        </Form.Item>
                        <Form.Item name="game_part" label="Game Participation">
                            <Input disabled style={{ color: 'gray' }} />
                        </Form.Item>
                        <Form.Item name="prec_game_medal" label="Previous Game Medal">
                            <Input disabled style={{ color: 'gray' }} />
                        </Form.Item>
                        <Form.Item name="prec_game_gold" label="Previous Game Gold">
                            <Input disabled style={{ color: 'gray' }} />
                        </Form.Item>
                        <Form.Item name="prec_game_silver" label="Previous Game Silver">
                            <Input disabled style={{ color: 'gray' }} />
                        </Form.Item>
                        <Form.Item name="prec_game_bronze" label="Previous Game Bronze">
                            <Input disabled style={{ color: 'gray' }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Predict Medals
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            )}
            {result && (
                <Card style={{ marginTop: '20px' }}>
                    <h2>Prediction Results</h2>
                    <p>🥇 Gold: {result.gold}</p>
                    <p>🥈 Silver: {result.silver}</p>
                    <p>🥉 Bronze: {result.bronze}</p>
                </Card>
            )}
        </div>
    );
};

export default MedalPredictionForm;
