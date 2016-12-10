import React from 'react';
import { Alert, Button, Card, Icon, Popconfirm, Table } from 'antd';

const AdminLesson = ({ error, loading, lesson, onEdit, onDelete }) => {
    if (error) return ( <Alert message="Mince, nous n'avons pas réussi à charger la leçon :(." type="error" showIcon />  );
    if (lesson === undefined) return null;

    const columns = [
        { title: 'Expression', dataIndex: 'expression', key: 'expression' },
        { title: 'Transcription', dataIndex: 'transcription', key: 'transcription' },
        { title: 'Translation', dataIndex: 'translation', key: 'translation' },
        { title: 'Opération', key: 'operation', render: (text, record) => (
            <span>
                <Button type="ghost" shape="circle" icon="edit" onClick={() => onEdit(record)} /> &nbsp;
                <Popconfirm title='Êtes-vous sûr de vouloir supprimer cette entrée ?' okText='Oui' cancelText='Non' onConfirm={() => onDelete(record)}>
                    <Button type="ghost" shape="circle" icon="delete" />
                </Popconfirm>
            </span>
        )}
    ];
    return (
        <Card>
            <Table loading={loading} dataSource={lesson.entries} columns={columns} pagination={false} locale={{emptyText: 'Cette leçon est vide, pour le moment.'}} />
            <Button style={{marginTop: '10px'}} type="primary" icon="plus" onClick={() => onEdit({})}>Ajouter</Button>
        </Card>
    );
};

export default AdminLesson;
