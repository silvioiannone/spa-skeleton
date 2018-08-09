# Navigator plugin

The navigator plugin provides with a set of utilities that can be used in order to easily move
around routes.

## Usage

### Go to parent route

In order to navigate to a parent route the `toRoute()` function can be used. For example if I want
to navigate 2 levels up from `/admin/companies/1/update` to `/admin/companies` it's sufficient to
use:

    this.$navigator.toParent(2)

### Go to path keeping the query parameters

Sometimes you want to navigate to a path while keeping the query parameters. This is the case, for
example, when you're visiting a paginated view: `/admin/companies?page=2`.  
If at this point we use `this.$router.push(...)` to view the details of a company in a dialog window
the background view (`/admin/companies`) will change to the first page and the dialog's content will
not display (unless using view actions you query the data for that specific server and when using
the `push()` function you pass it also the query parameters). A simple shortcut is provided:

    this.$navigator.toAndKeepQuery('/admin/companies/3')

This will navigate from `/admin/companies?page=2` to `/admin/companies/3?page=2`.
