import React from 'react'
import { Spring, Transition, animated } from 'react-spring/renderprops'

function Item(props) {
  return (
    <React.Fragment>
      <h2>
        {(props.filter === 1 ? 'Tasks uncomplete' : '')
          || (props.filter === 2 ? 'Tasks completed' : '')
          || (props.filter === 3 ? 'All Tasks' : '')}
      </h2>
      <div className="Info">
        <span class="total">
          Total:
      <Spring from={{ number: 0 }} to={{ number: props.allItems.length }} config={{ duration: 1000 }} >
            {number => (<i> {number.number.toFixed()} </i>)}
          </Spring>
        </span>
        <span class="complete">
          Completed:
            <Spring
            from={{ number: 0 }}
            to={{
              number: props.allItems.filter(complete => complete.complete === true).length
            }}
            config={{
              duration: 1000,
            }}
          >
            {number => (
              <i>
                {number.number.toFixed()}
              </i>
            )}
          </Spring>
        </span>
        <span class="uncomplete">
          Uncompleted:
                  <Spring
            from={{ number: 0 }}
            to={{ number: props.allItems.filter(complete => complete.complete === false).length }}
            config={{
              duration: 1000,
            }}
          >
            {number => (
              <i>
                {number.number.toFixed()}
              </i>
            )}
          </Spring>
        </span>
      </div>
      <button className="btn-toggle-filter" onClick={props.doFilterHandler}>Change filter</button>
      {!props.items.length ? 'No Tasks, add new task or change filter...' : ''}
      {props.items.map(item => (
        <Transition
          native
          items={item}
          from={{ opacity: 0, marginLeft: -100 }}
          enter={{ opacity: 1, marginLeft: 0 }}
          leave={{ opacity: 0 }}
          config={{
            deplay: 2000,
            speed: 2000
          }}
        >
          {repeat => repeat && (style => (
            <animated.div style={style}>
              <div className={item.complete ? 'item done' : 'item'}>
                <div className="title">
                  {item.title}
                </div>
                <div className="body">
                  {item.body}
                  <div className="control">
                    <button className={item.complete ? 'btn-toggle uncomplete' : 'btn-toggle complete'} onClick={() => props.setState(item.id)}> {item.complete ? 'Mark as uncomplete' : 'Mark  as complete'}
                    </button>
                    <button onClick={() => props.onDelete(item.id)} className="btn-del">Delete
            </button>
                  </div>
                </div>
              </div>
            </animated.div>
          ))}
        </Transition>
      ))}
    </React.Fragment>
  )
}
export default Item