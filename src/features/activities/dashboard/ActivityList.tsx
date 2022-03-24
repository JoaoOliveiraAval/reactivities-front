import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const { deleteActivity, activitiesByDate, loading } = activityStore;
  const [target, setTarget] = useState("");

  const handleActivityDelete = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.dates}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.avenue}
                </div>
                <Item.Extra>
                  <Button
                    onClick={() => activityStore.selectActivity(activity.id)}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={activity.id}
                    onClick={(event) =>
                      handleActivityDelete(event, activity.id)
                    }
                    floated="right"
                    content="Delete"
                    color="red"
                    loading={loading && target === activity.id}
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
