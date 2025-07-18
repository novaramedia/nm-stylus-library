# nm-stylus-library

This is the single source of truth for NM web design system in code.

## Releases

There are 2 flows for releases to this library:

### Need

The primary way this libray will change over time is due to need. We might be building a new feature that requires a new type of component as yet not existing in the library. At this point that component will be developed inside the project that needs it. But once that project is complete and whatever product being worked on needs to be released we need to upstream those changes into this library.

- Project on existing product needs new component
- Component is built out inside the project to a stable complete state
- Before release of the finished feature or next version of this product the stable css is copied from the product's codebase into this nm-stylus-library and removed from the product in development
- This library is then version bumped and released
- The package reference in the product being released is then updated, and then that product's new version is released

### Design System Iteration

At times we may want to change the way parts of this library work without this specifically being part of a project. This is a more challenging moment because all products that use this library will need new releases to implement any significant changes. This will also likely represent major version releases on this project as the changes will not be backwards compatable

- Digi team decide that certain changes need to be made
- The library is changed accordingly and the changes tested on staging sites for key products
- The library has a new version released
- All projects which use the library update their package reference and then bump their releases

## Dev

### Howto: Clone this repo into the novaramediacom wp theme

- Navigate to the novaramediacom theme file and go into the node_modules
- Delete the existing nm-stylus-library file
- Pull this nm-stylus-library repo in its place
