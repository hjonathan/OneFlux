

# ONEFLUX
One God, One Way, One Flow
OneFlux is a framework that structures applications by providing
- **Abstract components** - that communicate through events in a hierarchical way
- **Modules / services** - that communicate via an Event Bus
- **Injection Dependencies Simple**

## Quickstart

npm install

## Build the kernel First
gulp --task build-kernel
        
gulp --task test-kernel


## Why Dependency Injection?

## Why Event Bus?

## Why Actions & components?

## Example Register Factory

```js

var CaseManager = function (options) {
      this.config = {};
  };
OneFlux.registerFactory("@CaseManager", CaseManager);

## Usage

var CaseManager = OneFlux.instantiateFactory("@CaseManager", {});
```

### Example Register Service

```js
## Usage

var CaseManager = OneFlux.instantiateFactory("@CaseManager", {});
OneFlux.service("CaseManager", CaseManager);

## A service is used in DI
```

## Example DI & Event Bus

```js

var FormManager = function (EventBus, options) {
      this.config = {};
      this.eventBus = EventBus
  };

## EventBus is a service in framework & is used as DI
```

### EventBus
For more Information about Evetn Bus see postal js
