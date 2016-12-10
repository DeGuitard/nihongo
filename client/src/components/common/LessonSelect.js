import React from 'react';
import { Button, Card, Form, Input, Select, Spin } from 'antd';

const Option = Select.Option;

class LessonSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateFromProps(nextProps));
    }

    getStateFromProps({ loading, list, onSelect, currentLesson, adminMode, onAdd, onDelete }) {
       return { loading, list, onSelect, currentLesson, adminMode, onAdd, onDelete };
    }

    canAdd() {
        return this.state.newLesson && this.state.list.every(lesson => lesson.name !== this.state.newLesson);
    }

    canDelete() {
        return this.state.currentLesson;
    }

    addLesson = (e) => {
        if (e !== undefined) e.preventDefault();
        if (!this.canAdd()) return;
        this.state.onAdd(this.state.newLesson);
        this.setState({ newLesson: undefined });
    }

    handleLessonInput = ({ target }) => {
        this.setState({ newLesson: target.value });
    }

    render() {
        const selectedId = this.state.currentLesson ? this.state.currentLesson._id : undefined;
        return (
            <Card title="Choix de leçon">
                <Spin spinning={this.state.loading} >
                    <div style={{ display: 'flex', marginBottom: 10 }}>

                        <Select size='large' style={{ flex: 1, marginRight: 10 }} defaultValue={selectedId} onSelect={this.state.onSelect}>
                            {this.state.list.map((lesson, i) => 
                                <Option value={lesson._id} key={i}>{lesson.name}</Option>
                            )}
                        </Select>

                        {this.state.adminMode ?
                            <Button type='primary' onClick={() => this.state.onDelete(this.state.currentLesson._id)} icon='minus' disabled={!this.canDelete()}>Supprimer</Button>
                        : undefined}
                    </div>
                    { this.state.adminMode ? 
                        <Form inline onSubmit={this.addLesson}>
                            <Form.Item>
                                <Input value={this.state.newLesson} onChange={this.handleLessonInput} placeholder='Nom de la leçon' />
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' icon='plus' onClick={this.addLesson} disabled={!this.canAdd()}>Ajouter</Button>
                            </Form.Item>
                        </Form>
                    : undefined }
                </Spin>
            </Card>
        );
    }
}

export default LessonSelect;
