import { useState } from "react";
import "./App.css";
import Welcome from "./Welcome";
import Button from "./Button";
import ArrowFunction from "./ArrowFunction";
import { Export } from "./Export";
import { HelloWorld, HelloworldWithoutJSX } from "./WithoutJSX";
import { UserProfile } from "./UserProfile";
import { ContactForm } from "./ContactForm";
import { StyledForm } from "./StyledForm";
import { CandidateProfile } from "./CandidateProfile";
import { Props } from "./Props";
import { Product } from "./Product";
import { DestructureProps } from "./DestructureProps";
import { Greetings } from "./Greetings";
import { CardWrapper } from "./CardWrapper";
import { UserDetails } from "./UserDetails";
import { ProductLists } from "./ProductLists";
import { NameList } from "./NameList";
import { TodoList } from "./TodoList";
import { Alert } from "./Alert";
import { ExternalCSS } from "./ExternalCSS";
import { ExternalCSS as CssModules } from "./CssModules";
import { CustomButton } from "./CustomButton";
import { Contact } from "./Contact";
import { NewsLetter } from "./Newsletter";
import { Menu } from "./Menu";
import { Counter } from "./Counter";
import { LoginCard } from "./LoginCard";

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <Welcome />
      <Button />
      <Welcome />
      <Button />
      <ArrowFunction />
      <Export />
      <HelloWorld />
      <HelloworldWithoutJSX />
      <HelloWorld />
      <UserProfile />
      <ContactForm />
      <StyledForm />
      <CandidateProfile />

      <h1>Props</h1>
      <Props name="John Doe" nickname="Batman" />
      <Props name="Jane Smith" nickname="Spider-Man" />
      <Props name="Alice Johnson" nickname="Iron Woman" />

      <h1>Products</h1>
      <Product
        title="Sample Product"
        price={19.99}
        inStock={true}
        categories={["Electronics", "Gadgets"]}
      />
      <Product
        title="Another Product"
        price={29.99}
        inStock={false}
        categories={["Clothing", "Accessories"]}
      />

      <h1>Destructured Props</h1>
      <DestructureProps
        title="Destructured Product"
        price={39.99}
        inStock={true}
        categories={["Home", "Kitchen"]}
      />
      <DestructureProps
        title="Another Destructured Product"
        price={49.99}
        inStock={false}
        categories={["Sports", "Outdoor"]}
      />

      <h1>Greetings</h1>
      <Greetings name="Alice" message="Hi" />
      <Greetings name="Bob" />
      <Greetings message="Hey" />
      <Greetings name="David" message="Greetings" />
      <Greetings />

      <h1>Card Wrapper</h1>
      <CardWrapper title="User Profile">
        <p>This is the user profile content.</p>
        <p>Rajdeep Mudiar</p>
        <p>rajdeepmudiar06@gmail.com</p>
        <button>Edit Profile</button>
      </CardWrapper>

      <h1>User Details</h1>
      <UserDetails
        name="Rajdeep Mudiar"
        isOnline={true}
        hideOffline={true}
        role="admin"
      />
      <UserDetails name="Jane Smith" isOnline={false} role="user" />

      <h1>Product Lists</h1>
      <ProductLists />

      <h1>Name List</h1>
      <NameList />

      <h1>Todo List</h1>
      <TodoList />

      <h1>Alert</h1>
      <Alert type="success">Your changes have been saved.</Alert>
      <Alert type="error">An error occurred while saving your changes.</Alert>

      <h1>External CSS</h1>
      <ExternalCSS type="success">This is a success alert.</ExternalCSS>
      <ExternalCSS type="error">This is an error alert.</ExternalCSS>

      <h1>CSS Modules</h1>
      <CssModules type="success">This is a success alert.</CssModules>
      <CssModules type="error">This is an error alert.</CssModules>

      <h1>Custom Button</h1>
      <CustomButton text="Like" />
      <CustomButton text="Dislike" />
      <CustomButton text="Subscribe" />

      <h1>Contact</h1>
      <Contact />

      <h1>Newsletter</h1>
      <NewsLetter />

      <h1>Menu</h1>
      <Menu />

      <h1>Counter</h1>
      <Counter />
      <Counter />

      <h1>Login Card</h1>
      <LoginCard />
    </div>
  );
}

export default App;
