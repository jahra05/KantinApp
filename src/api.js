async function login({ username, password }) {
  try {
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const responseJson = await response.json();
    console.log("login response", responseJson);

    if (responseJson.code !== "login/success") {
      alert(responseJson.message);
      return { error: true, data: null };
    }


    return { error: false, data: null };
  } catch (error) {
    console.error("Login failed:", error);
    alert("An error occurred while logging in. Please try again.");
    return { error: true, data: null };
  }
}



async function produkList() {
  const response = await fetch('http://localhost:8000/api/product/get-list', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`http error! status: ${response.status}`)
  }

  const data = await response.json();
  if (data.message === "ok") {
    return { error: false, data: data.data };
  } else {
    return { error: true, message: "respon dari  server tidak berhasi" };
  }

}


const checkout = async ({ products }) => {
  try {
    console.log("Body request:", JSON.stringify({ products })); // Debug body request

    const response = await fetch('http://localhost:8000/api/order/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Checkout error:", error.message);
    return null;
  }
};


const getOrder = async ({ orderId }) => {
  try {
    const response = await fetch(`http://localhost:8000/api/order/${orderId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!response) {
      throw Error(`http error! status: ${response.status}`)
    }
    const data = await response.json()
    if (data.message === "ok") {
      return { error: false, data: data.data }
    } else {
      return { error: true, message: data.message }
    }
  } catch (error) {
    console.error("error order", error)
    return { error: true, message: error.message }
  }

}

const payOrder = async (params) => {
  const response = await fetch(`http://localhost:8000/api/order/pay`, {
    method: 'POST',
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
  if (!response) {
    console.error(response, "error")
  }

  const data = await response.json();
  return data;

}

export { login, produkList, checkout, getOrder, payOrder, }


