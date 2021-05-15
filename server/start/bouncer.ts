/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-tabs */
/**
 * Contract source: https://git.io/Jte3T
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Skill from 'App/Models/Skill'
import Storage from 'App/Models/Storage'
import Item from 'App/Models/Item'
import Attribute from 'App/Models/Attribute'
import Stat from 'App/Models/Stat'
import Character from 'App/Models/Character'

/*
|--------------------------------------------------------------------------
| Bouncer Actions
|--------------------------------------------------------------------------
|
| Actions allows you to separate your application business logic from the
| authorization logic. Feel free to make use of policies when you find
| yourself creating too many actions
|
| You can define an action using the `.define` method on the Bouncer object
| as shown in the following example
|
| ```
| 	Bouncer.define('deletePost', (user: User, post: Post) => {
|			return post.user_id === user.id
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "actions" const from this file
|****************************************************************
*/
type Resource = Attribute | Skill | Storage | Stat | Character | null
type WithoutUser = Item

export const { actions } = Bouncer.define('update', (user: User, resource: Resource) => {
  if (!resource) return Bouncer.deny('Este recurso não existe', 422)

  return user.isMaster || resource?.userId === user.id
}).define('founded', (_user: User, resource: Resource | WithoutUser) => {
  if (!resource) return Bouncer.deny('Este recurso não existe', 422)

  return true
})

/*
|--------------------------------------------------------------------------
| Bouncer Policies
|--------------------------------------------------------------------------
|
| Policies are self contained actions for a given resource. For example: You
| can create a policy for a "User" resource, one policy for a "Post" resource
| and so on.
|
| The "registerPolicies" accepts a unique policy name and a function to lazy
| import the policy
|
| ```
| 	Bouncer.registerPolicies({
|			UserPolicy: () => import('App/Policies/User'),
| 		PostPolicy: () => import('App/Policies/Post')
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "policies" const from this file
|****************************************************************
*/
export const { policies } = Bouncer.registerPolicies({
  StatPolicy: () => import('App/Policies/StatPolicy')
})
