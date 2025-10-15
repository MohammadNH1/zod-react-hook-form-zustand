export async function getTodos(page = 1) {
  try {
    const limit = 10;
    const skip = (page - 1) * limit;

    const response = await fetch(
      `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching todos! ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error fetching todo", error);
    throw error;
  }
}

export async function createTodo(todoData: {
  todo: string;
  completed: boolean;
  userId: number;
}) {
  try {
    const response = await fetch(`https://dummyjson.com/todos/add`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });

    if (!response.ok) {
      throw new Error(`Failed with status ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error creating todo", error);
    throw error;
  }
}
