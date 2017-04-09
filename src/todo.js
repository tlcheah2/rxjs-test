

class Todo extends Component {

    // static propTypes = {
    //     text: PropTypes.
    // }

    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onTodoClick}>
                <Text>
                    {this.props.text}
                </Text>
            </TouchableHighlight>
        );

    }
}


class TodoList extends Component {
    render() {
        <ListView
            dataSource={this.props.visvileTodo}
            renderRow={(todo) => {
                return <Todo key={todo.id} {...todo} onTodoClick={this.props.onTodoClick(todo.id) } />
            } }
            />
    }
}

class AddTodo extends Component {
    render() {
        let input = "";
        return (
            <View>
                <TextInput />
                <Button title="Add Todo" onPress={this.props.onAddTodo(input) }  />
            </View>

        )
    }
}

class FilterLink extends Components {
    render() {
        return (
            <TouchableHighlight onPress={this.props.onFilterClicked()}>
                <Text>{this.props.filter}</Text>
            </TouchableHighlight>
        )
    }
}

class Footer extends Component {
    render() {
        return (
            <View>
                <Text>{'Show'}</Text>
                <FilterLink filter={'SHOW_ALL'} currentFilter={visibilityFilter} onFilterClicked={this.props.onFilterClicked} />
                <FilterLink filter={'SHOW_COMPLETED'} currentFilter={visibilityFilter} onFilterClicked={this.props.onFilterClicked} />
                <FilterLink filter={'SHOW_ACTIVE'} currentFilter={visibilityFilter} onFilterClicked={this.props.onFilterClicked}/>
            </View>
        );
    }
}

class TodoApp extends Component {
    render() {
        return (
            <View>
                <AddTodo onAddTodo={(input) => {
                    //Dispatch add to do action
                    store.dispatch({
                        type: 'ADD_TODO',
                        id: 1,
                        text: value,
                    })
                } } />
                <TodoList
                    visibleTodo={visvileTodo}
                    onTodoClick={(id) => {
                        //Dispatch action
                    } }
                    />
                    <Footer visibilityFilter={visibilityFilter} onFilterClicked={(filter) => {
                        //Dispatch action SET_VISIBILITY_FILTER
                    }}  />
            </View>
        )
    }
}