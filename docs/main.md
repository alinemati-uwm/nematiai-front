# Nerd Studio Client

---

## Table of Contents

- [1. Project Structure](#1-project-structure)
- [2. Best Practices](#2-best-practices)
- [3. In-depth detail of `@refactor_lib`](#3-in-depth-detail-of-refactor_lib)
  - [3.1 Constants folder](#31-constants-folder)
  - [3.2 Hooks folder](#32-hooks-folder)
  - [3.3 Services folder](#33-services-folder)
  - [3.4 Components folder](#34-components-folder)
- [4. Toasts](#4-toasts)
  - [4.1 Toast component](#41-toast-component)
  - [4.2 Toast types](#42-toast-types)
  - [4.3 Toast usage](#43-toast-usage)
    - [4.3.1 Create a toast and then update it](#431-create-a-toast-and-then-update-it)
    - [4.3.2 Create a toast without updating](#432-create-a-toast-without-updating)

---

### 1. Project Structure

```
.
├── docker
├── public
└── src
    ├── app
    ├── refactor_lib
    │   ├── atoms # jotai atoms declarations
    │   ├── components # uses atomic design
    │   │   ├── atoms
    │   │   ├── molecules
    │   │   └── organisms
    │   ├── constants
    │   ├── contexts
    │   ├── hooks
    │   │   ├── atoms
    │   │   ├── mutations
    │   │   ├── queries
    │   │   └── shared
    │   ├── providers # all providers e.g., react-query, toast, ...
    │   ├── services
    │   │   └── api
    │   │       └── v1
    │   ├── types
    │   │   ├── api
    │   │   │   └── v1
    │   │   ├── enums
    │   │   └── interfaces
    │   └── utils # store all vanilla javascript helpers
    ├── components       # legacy
    ├── config           # legacy
    ├── constants        # legacy
    ├── features         # legacy
    ├── hooks            # legacy
    ├── lib              # legacy
    ├── services         # legacy
    ├── stores           # legacy
    ├── styles           # legacy
    └── types            # legacy
```

---

### 2. Best Practices

- Each react component file should only export one react component
- All hard-coded literals must be stored inside `@refactor_lib/constants`
- All hard-coded API endpoints must be stored inside `@refactor_lib/services/api/v[X]` where **_X_** is the API version
- variable naming should follow **_Camel casing_** convention
- component naming should follow **_Pascal casing_** convention

---

### 3. In-depth detail of `@refactor_lib`

in this section we will go through most-used folders and files. we will also provide example code and usage.

#### 3.1 Constants folder

this folder includes all the hard-coded literals used throughout the project. most important files are as below:

- `routes.ts`: this file includes all of the application routes. routes are used throughout the project for linking and navigation.
- `queryKey.ts`: this file includes all of the query keys used for react-query and useQuery hooks.
- `promptTemplateCreator.ts`: this file includes a helper class for using and storing prompts throughout the project.
- `localStorageKey.ts`: this file includes all the keys used for accessing browser local storage.

#### 3.2 Hooks folder

this folder includes all of the hooks used throughout the project separated by feature.

- `mutations/`: this folder includes all hooks using useMutation.
- `queries/`: this folder includes all hooks using useQuery.
- `atoms/`: this folder includes all accessor and updater hooks for jotai atoms.
- `shared/`: this folder includes all general hooks that fall in neither categories.

most important hooks are as follows:

- `mutations/useStreamMutation.ts`: this hook helps developer for creating stream mutations hooks (e.g., `useStreamRewrite.ts`, `useStreamHighlight.ts`, ...)
- `queries/useGetMe.ts`: this hook is used for client side auth check. client side check resides in `src/app/[lang]/(protect-roots)/layout.tsx`. if client side auth check fails, the layout mentioned will perform a logout action.
- `queries/useGetUserWorkspaces.ts`: this hook is used for fetching user workspaces if there was any error it will perform a logout action.
- `shared/useUserSession.ts`: this hook is used for reading user session from browser local storage.
- `shared/useToaster.ts`: this hook is used for creating and handling toasts throughout the project. for more information read [Toasts](#4-toasts)

#### 3.3 Services folder

this folder contains all of the hard-coded API endpoints used throughout the project. also `axiosInstanceV1` and `createFetchEventSourceClientV1` are stored inside `@refactor_lib/services/api/v1/index.ts`. we will talk about some of their most important functionalities below:

- `axiosInstanceV1`: most important functionality of the axiosInstance is auto refreshing access token and retrying failed queries that triggered access token refresh.
- `createFetchEventSourceClientV1`: helps create a `@microsoft/fetch-event-source` for later uses in react hooks, this client can't refresh access token but has a retry feature implemented inside `useStreamMutation` hook due to inconsistencies with some AI endpoints.

#### 3.4 Components folder

nothing special but I must include that this folder follows the [atomic web design](https://bradfrost.com/blog/post/atomic-web-design/) and each component is stored inside a folder which uses **_Pascal casing_** and contains an `CreateLoading.tsx` file.

---

### 4. Toasts

in this section we will explain toast functionality and provide example usage. for toast management `react-toastify` is used.

#### 4.1 Toast component

this is the rendered component on the page, it resides at `@refactor_lib/components/atoms/Toast/CreateLoading.tsx`.

#### 4.2 Toast types

all toast must be of following types:

- `success`
- `error`
- `warning`
- `info`
- `promise`: this type will evolve into any of the types mentioned above and requires handling.

#### 4.3 Toast usage

for all purposes of creating and handling a toast, the `useToaster.tsx` hook is used. you can either use `toaster()` or `toasterWithoutUpdate()`. there is two possible usage for toasts:

##### 4.3.1 Create a toast and then update it

```ts
toaster(props: {
	toastProps: ToastProps;
	toastConfig?: ToastOptions | UpdateOptions;
	disableAutoClose?: boolean;
})
```

This approach is mainly used in mutations and scenarios where a toast notification with a `promise` type is required. In such cases, we disable the global auto-close duration using the `disableAutoClose: true` option. This is because the server response might take longer than the global auto-close duration, causing the toast to close prematurely. After this, you must manually set the toast to close with a timeout or close it instantly. To close the toast after a timeout, use `closeToastAfterTimeout({ useDefaultCloseDuration: true })`, which can use either the default global timeout or a specific one. To close the toast instantly, use `closeToast()`. Note that during each stage of the API call (success or error), you can call the same `toaster` function with different properties to update the initial `promise` type toast.

**example usage**:

```js
const { toaster, closeToastAfterTimeout, closeToast } = useToaster();

const handleLogin = async (data: FormTypes) => {
		setIsPending(true);
		toaster({
			toastProps: { type: "promise", message: "logging in..." },
			disableAutoClose: true,
		});
		authAPI
			.login(data)
			.then((res) => {
				LocalStorageManger.setUserSession(res.data);
				toaster({
					toastProps: { type: "success", message: "Logged in successfully" },
				});
				router.push(APP_ROUTES.dashboard);
			})
			.catch((err) => {
				const errMessage = extractErrorMessage(
					err,
					"An error occurred during login",
				);
				toaster({ toastProps: { type: "error", message: errMessage } });
			})
			.finally(() => {
				setIsPending(false);
				closeToastAfterTimeout({ useDefaultCloseDuration: true });
				// or closeToast()
			});
	};
```

##### 4.3.2 Create a toast without updating

```ts
toasterWithoutUpdate(props: {
	toastProps: ToastProps;
	toastConfig?: ToastOptions;
})
```

this is mostly used in places where user must see a notification but not of type `promise`. to create a toast without updating it you must use `toasterWithoutUpdate()`. this toast will close after default global auto-close duration but this is also configurable per toast via `toastConfig`

**example usage**

```js
const { toasterWithoutUpdate } = useToaster();

toasterWithoutUpdate({
	toastProps: {
		type: "error",
		message: "Error happened while generating highlights!",
	},
});
```
