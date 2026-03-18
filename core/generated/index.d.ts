
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Authorization
 * 
 */
export type Authorization = $Result.DefaultSelection<Prisma.$AuthorizationPayload>
/**
 * Model TaskEscrow
 * 
 */
export type TaskEscrow = $Result.DefaultSelection<Prisma.$TaskEscrowPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Personality: {
  GUARDIAN: 'GUARDIAN',
  ACCOUNTANT: 'ACCOUNTANT',
  STRATEGIST: 'STRATEGIST'
};

export type Personality = (typeof Personality)[keyof typeof Personality]


export const TaskEscrowStatus: {
  RESERVED: 'RESERVED',
  RELEASED: 'RELEASED'
};

export type TaskEscrowStatus = (typeof TaskEscrowStatus)[keyof typeof TaskEscrowStatus]


export const AuditLogStatus: {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

export type AuditLogStatus = (typeof AuditLogStatus)[keyof typeof AuditLogStatus]

}

export type Personality = $Enums.Personality

export const Personality: typeof $Enums.Personality

export type TaskEscrowStatus = $Enums.TaskEscrowStatus

export const TaskEscrowStatus: typeof $Enums.TaskEscrowStatus

export type AuditLogStatus = $Enums.AuditLogStatus

export const AuditLogStatus: typeof $Enums.AuditLogStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authorization`: Exposes CRUD operations for the **Authorization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Authorizations
    * const authorizations = await prisma.authorization.findMany()
    * ```
    */
  get authorization(): Prisma.AuthorizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taskEscrow`: Exposes CRUD operations for the **TaskEscrow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskEscrows
    * const taskEscrows = await prisma.taskEscrow.findMany()
    * ```
    */
  get taskEscrow(): Prisma.TaskEscrowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Authorization: 'Authorization',
    TaskEscrow: 'TaskEscrow',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "authorization" | "taskEscrow" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Authorization: {
        payload: Prisma.$AuthorizationPayload<ExtArgs>
        fields: Prisma.AuthorizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthorizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthorizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationPayload>
          }
          findFirst: {
            args: Prisma.AuthorizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthorizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationPayload>
          }
          findMany: {
            args: Prisma.AuthorizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationPayload>[]
          }
          create: {
            args: Prisma.AuthorizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationPayload>
          }
          createMany: {
            args: Prisma.AuthorizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthorizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationPayload>[]
          }
          delete: {
            args: Prisma.AuthorizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationPayload>
          }
          update: {
            args: Prisma.AuthorizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationPayload>
          }
          deleteMany: {
            args: Prisma.AuthorizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthorizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthorizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationPayload>[]
          }
          upsert: {
            args: Prisma.AuthorizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationPayload>
          }
          aggregate: {
            args: Prisma.AuthorizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthorization>
          }
          groupBy: {
            args: Prisma.AuthorizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthorizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthorizationCountArgs<ExtArgs>
            result: $Utils.Optional<AuthorizationCountAggregateOutputType> | number
          }
        }
      }
      TaskEscrow: {
        payload: Prisma.$TaskEscrowPayload<ExtArgs>
        fields: Prisma.TaskEscrowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskEscrowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEscrowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskEscrowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEscrowPayload>
          }
          findFirst: {
            args: Prisma.TaskEscrowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEscrowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskEscrowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEscrowPayload>
          }
          findMany: {
            args: Prisma.TaskEscrowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEscrowPayload>[]
          }
          create: {
            args: Prisma.TaskEscrowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEscrowPayload>
          }
          createMany: {
            args: Prisma.TaskEscrowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskEscrowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEscrowPayload>[]
          }
          delete: {
            args: Prisma.TaskEscrowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEscrowPayload>
          }
          update: {
            args: Prisma.TaskEscrowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEscrowPayload>
          }
          deleteMany: {
            args: Prisma.TaskEscrowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskEscrowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskEscrowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEscrowPayload>[]
          }
          upsert: {
            args: Prisma.TaskEscrowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskEscrowPayload>
          }
          aggregate: {
            args: Prisma.TaskEscrowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskEscrow>
          }
          groupBy: {
            args: Prisma.TaskEscrowGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskEscrowGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskEscrowCountArgs<ExtArgs>
            result: $Utils.Optional<TaskEscrowCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    authorization?: AuthorizationOmit
    taskEscrow?: TaskEscrowOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    authorizations: number
    taskEscrows: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authorizations?: boolean | UserCountOutputTypeCountAuthorizationsArgs
    taskEscrows?: boolean | UserCountOutputTypeCountTaskEscrowsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuthorizationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthorizationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTaskEscrowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskEscrowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    hashedId: string | null
    eoaAddress: string | null
    walletAddress: string | null
    personality: $Enums.Personality | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    hashedId: string | null
    eoaAddress: string | null
    walletAddress: string | null
    personality: $Enums.Personality | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    hashedId: number
    eoaAddress: number
    walletAddress: number
    personality: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    hashedId?: true
    eoaAddress?: true
    walletAddress?: true
    personality?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    hashedId?: true
    eoaAddress?: true
    walletAddress?: true
    personality?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    hashedId?: true
    eoaAddress?: true
    walletAddress?: true
    personality?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    hashedId: string
    eoaAddress: string
    walletAddress: string | null
    personality: $Enums.Personality
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    hashedId?: boolean
    eoaAddress?: boolean
    walletAddress?: boolean
    personality?: boolean
    createdAt?: boolean
    authorizations?: boolean | User$authorizationsArgs<ExtArgs>
    taskEscrows?: boolean | User$taskEscrowsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    hashedId?: boolean
    eoaAddress?: boolean
    walletAddress?: boolean
    personality?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    hashedId?: boolean
    eoaAddress?: boolean
    walletAddress?: boolean
    personality?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    hashedId?: boolean
    eoaAddress?: boolean
    walletAddress?: boolean
    personality?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"hashedId" | "eoaAddress" | "walletAddress" | "personality" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authorizations?: boolean | User$authorizationsArgs<ExtArgs>
    taskEscrows?: boolean | User$taskEscrowsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      authorizations: Prisma.$AuthorizationPayload<ExtArgs>[]
      taskEscrows: Prisma.$TaskEscrowPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      hashedId: string
      eoaAddress: string
      walletAddress: string | null
      personality: $Enums.Personality
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `hashedId`
     * const userWithHashedIdOnly = await prisma.user.findMany({ select: { hashedId: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `hashedId`
     * const userWithHashedIdOnly = await prisma.user.createManyAndReturn({
     *   select: { hashedId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `hashedId`
     * const userWithHashedIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { hashedId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    authorizations<T extends User$authorizationsArgs<ExtArgs> = {}>(args?: Subset<T, User$authorizationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    taskEscrows<T extends User$taskEscrowsArgs<ExtArgs> = {}>(args?: Subset<T, User$taskEscrowsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskEscrowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly hashedId: FieldRef<"User", 'String'>
    readonly eoaAddress: FieldRef<"User", 'String'>
    readonly walletAddress: FieldRef<"User", 'String'>
    readonly personality: FieldRef<"User", 'Personality'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.authorizations
   */
  export type User$authorizationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authorization
     */
    select?: AuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authorization
     */
    omit?: AuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationInclude<ExtArgs> | null
    where?: AuthorizationWhereInput
    orderBy?: AuthorizationOrderByWithRelationInput | AuthorizationOrderByWithRelationInput[]
    cursor?: AuthorizationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthorizationScalarFieldEnum | AuthorizationScalarFieldEnum[]
  }

  /**
   * User.taskEscrows
   */
  export type User$taskEscrowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEscrow
     */
    select?: TaskEscrowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEscrow
     */
    omit?: TaskEscrowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEscrowInclude<ExtArgs> | null
    where?: TaskEscrowWhereInput
    orderBy?: TaskEscrowOrderByWithRelationInput | TaskEscrowOrderByWithRelationInput[]
    cursor?: TaskEscrowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskEscrowScalarFieldEnum | TaskEscrowScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Authorization
   */

  export type AggregateAuthorization = {
    _count: AuthorizationCountAggregateOutputType | null
    _avg: AuthorizationAvgAggregateOutputType | null
    _sum: AuthorizationSumAggregateOutputType | null
    _min: AuthorizationMinAggregateOutputType | null
    _max: AuthorizationMaxAggregateOutputType | null
  }

  export type AuthorizationAvgAggregateOutputType = {
    expiresAt: number | null
  }

  export type AuthorizationSumAggregateOutputType = {
    expiresAt: number | null
  }

  export type AuthorizationMinAggregateOutputType = {
    id: string | null
    userHashedId: string | null
    agentId: string | null
    signature: string | null
    maxSpend: string | null
    expiresAt: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuthorizationMaxAggregateOutputType = {
    id: string | null
    userHashedId: string | null
    agentId: string | null
    signature: string | null
    maxSpend: string | null
    expiresAt: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AuthorizationCountAggregateOutputType = {
    id: number
    userHashedId: number
    agentId: number
    signature: number
    maxSpend: number
    expiresAt: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AuthorizationAvgAggregateInputType = {
    expiresAt?: true
  }

  export type AuthorizationSumAggregateInputType = {
    expiresAt?: true
  }

  export type AuthorizationMinAggregateInputType = {
    id?: true
    userHashedId?: true
    agentId?: true
    signature?: true
    maxSpend?: true
    expiresAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuthorizationMaxAggregateInputType = {
    id?: true
    userHashedId?: true
    agentId?: true
    signature?: true
    maxSpend?: true
    expiresAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AuthorizationCountAggregateInputType = {
    id?: true
    userHashedId?: true
    agentId?: true
    signature?: true
    maxSpend?: true
    expiresAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AuthorizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Authorization to aggregate.
     */
    where?: AuthorizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authorizations to fetch.
     */
    orderBy?: AuthorizationOrderByWithRelationInput | AuthorizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthorizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authorizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authorizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Authorizations
    **/
    _count?: true | AuthorizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuthorizationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuthorizationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthorizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthorizationMaxAggregateInputType
  }

  export type GetAuthorizationAggregateType<T extends AuthorizationAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthorization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthorization[P]>
      : GetScalarType<T[P], AggregateAuthorization[P]>
  }




  export type AuthorizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthorizationWhereInput
    orderBy?: AuthorizationOrderByWithAggregationInput | AuthorizationOrderByWithAggregationInput[]
    by: AuthorizationScalarFieldEnum[] | AuthorizationScalarFieldEnum
    having?: AuthorizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthorizationCountAggregateInputType | true
    _avg?: AuthorizationAvgAggregateInputType
    _sum?: AuthorizationSumAggregateInputType
    _min?: AuthorizationMinAggregateInputType
    _max?: AuthorizationMaxAggregateInputType
  }

  export type AuthorizationGroupByOutputType = {
    id: string
    userHashedId: string
    agentId: string
    signature: string
    maxSpend: string
    expiresAt: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: AuthorizationCountAggregateOutputType | null
    _avg: AuthorizationAvgAggregateOutputType | null
    _sum: AuthorizationSumAggregateOutputType | null
    _min: AuthorizationMinAggregateOutputType | null
    _max: AuthorizationMaxAggregateOutputType | null
  }

  type GetAuthorizationGroupByPayload<T extends AuthorizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthorizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthorizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthorizationGroupByOutputType[P]>
            : GetScalarType<T[P], AuthorizationGroupByOutputType[P]>
        }
      >
    >


  export type AuthorizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userHashedId?: boolean
    agentId?: boolean
    signature?: boolean
    maxSpend?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Authorization$userArgs<ExtArgs>
  }, ExtArgs["result"]["authorization"]>

  export type AuthorizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userHashedId?: boolean
    agentId?: boolean
    signature?: boolean
    maxSpend?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Authorization$userArgs<ExtArgs>
  }, ExtArgs["result"]["authorization"]>

  export type AuthorizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userHashedId?: boolean
    agentId?: boolean
    signature?: boolean
    maxSpend?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Authorization$userArgs<ExtArgs>
  }, ExtArgs["result"]["authorization"]>

  export type AuthorizationSelectScalar = {
    id?: boolean
    userHashedId?: boolean
    agentId?: boolean
    signature?: boolean
    maxSpend?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AuthorizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userHashedId" | "agentId" | "signature" | "maxSpend" | "expiresAt" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["authorization"]>
  export type AuthorizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Authorization$userArgs<ExtArgs>
  }
  export type AuthorizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Authorization$userArgs<ExtArgs>
  }
  export type AuthorizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Authorization$userArgs<ExtArgs>
  }

  export type $AuthorizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Authorization"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userHashedId: string
      agentId: string
      signature: string
      maxSpend: string
      expiresAt: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["authorization"]>
    composites: {}
  }

  type AuthorizationGetPayload<S extends boolean | null | undefined | AuthorizationDefaultArgs> = $Result.GetResult<Prisma.$AuthorizationPayload, S>

  type AuthorizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthorizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthorizationCountAggregateInputType | true
    }

  export interface AuthorizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Authorization'], meta: { name: 'Authorization' } }
    /**
     * Find zero or one Authorization that matches the filter.
     * @param {AuthorizationFindUniqueArgs} args - Arguments to find a Authorization
     * @example
     * // Get one Authorization
     * const authorization = await prisma.authorization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthorizationFindUniqueArgs>(args: SelectSubset<T, AuthorizationFindUniqueArgs<ExtArgs>>): Prisma__AuthorizationClient<$Result.GetResult<Prisma.$AuthorizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Authorization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthorizationFindUniqueOrThrowArgs} args - Arguments to find a Authorization
     * @example
     * // Get one Authorization
     * const authorization = await prisma.authorization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthorizationFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthorizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthorizationClient<$Result.GetResult<Prisma.$AuthorizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Authorization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizationFindFirstArgs} args - Arguments to find a Authorization
     * @example
     * // Get one Authorization
     * const authorization = await prisma.authorization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthorizationFindFirstArgs>(args?: SelectSubset<T, AuthorizationFindFirstArgs<ExtArgs>>): Prisma__AuthorizationClient<$Result.GetResult<Prisma.$AuthorizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Authorization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizationFindFirstOrThrowArgs} args - Arguments to find a Authorization
     * @example
     * // Get one Authorization
     * const authorization = await prisma.authorization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthorizationFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthorizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthorizationClient<$Result.GetResult<Prisma.$AuthorizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Authorizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Authorizations
     * const authorizations = await prisma.authorization.findMany()
     * 
     * // Get first 10 Authorizations
     * const authorizations = await prisma.authorization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authorizationWithIdOnly = await prisma.authorization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthorizationFindManyArgs>(args?: SelectSubset<T, AuthorizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Authorization.
     * @param {AuthorizationCreateArgs} args - Arguments to create a Authorization.
     * @example
     * // Create one Authorization
     * const Authorization = await prisma.authorization.create({
     *   data: {
     *     // ... data to create a Authorization
     *   }
     * })
     * 
     */
    create<T extends AuthorizationCreateArgs>(args: SelectSubset<T, AuthorizationCreateArgs<ExtArgs>>): Prisma__AuthorizationClient<$Result.GetResult<Prisma.$AuthorizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Authorizations.
     * @param {AuthorizationCreateManyArgs} args - Arguments to create many Authorizations.
     * @example
     * // Create many Authorizations
     * const authorization = await prisma.authorization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthorizationCreateManyArgs>(args?: SelectSubset<T, AuthorizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Authorizations and returns the data saved in the database.
     * @param {AuthorizationCreateManyAndReturnArgs} args - Arguments to create many Authorizations.
     * @example
     * // Create many Authorizations
     * const authorization = await prisma.authorization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Authorizations and only return the `id`
     * const authorizationWithIdOnly = await prisma.authorization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthorizationCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthorizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Authorization.
     * @param {AuthorizationDeleteArgs} args - Arguments to delete one Authorization.
     * @example
     * // Delete one Authorization
     * const Authorization = await prisma.authorization.delete({
     *   where: {
     *     // ... filter to delete one Authorization
     *   }
     * })
     * 
     */
    delete<T extends AuthorizationDeleteArgs>(args: SelectSubset<T, AuthorizationDeleteArgs<ExtArgs>>): Prisma__AuthorizationClient<$Result.GetResult<Prisma.$AuthorizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Authorization.
     * @param {AuthorizationUpdateArgs} args - Arguments to update one Authorization.
     * @example
     * // Update one Authorization
     * const authorization = await prisma.authorization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthorizationUpdateArgs>(args: SelectSubset<T, AuthorizationUpdateArgs<ExtArgs>>): Prisma__AuthorizationClient<$Result.GetResult<Prisma.$AuthorizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Authorizations.
     * @param {AuthorizationDeleteManyArgs} args - Arguments to filter Authorizations to delete.
     * @example
     * // Delete a few Authorizations
     * const { count } = await prisma.authorization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthorizationDeleteManyArgs>(args?: SelectSubset<T, AuthorizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authorizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Authorizations
     * const authorization = await prisma.authorization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthorizationUpdateManyArgs>(args: SelectSubset<T, AuthorizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authorizations and returns the data updated in the database.
     * @param {AuthorizationUpdateManyAndReturnArgs} args - Arguments to update many Authorizations.
     * @example
     * // Update many Authorizations
     * const authorization = await prisma.authorization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Authorizations and only return the `id`
     * const authorizationWithIdOnly = await prisma.authorization.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthorizationUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthorizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Authorization.
     * @param {AuthorizationUpsertArgs} args - Arguments to update or create a Authorization.
     * @example
     * // Update or create a Authorization
     * const authorization = await prisma.authorization.upsert({
     *   create: {
     *     // ... data to create a Authorization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Authorization we want to update
     *   }
     * })
     */
    upsert<T extends AuthorizationUpsertArgs>(args: SelectSubset<T, AuthorizationUpsertArgs<ExtArgs>>): Prisma__AuthorizationClient<$Result.GetResult<Prisma.$AuthorizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Authorizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizationCountArgs} args - Arguments to filter Authorizations to count.
     * @example
     * // Count the number of Authorizations
     * const count = await prisma.authorization.count({
     *   where: {
     *     // ... the filter for the Authorizations we want to count
     *   }
     * })
    **/
    count<T extends AuthorizationCountArgs>(
      args?: Subset<T, AuthorizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthorizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Authorization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthorizationAggregateArgs>(args: Subset<T, AuthorizationAggregateArgs>): Prisma.PrismaPromise<GetAuthorizationAggregateType<T>>

    /**
     * Group by Authorization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthorizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthorizationGroupByArgs['orderBy'] }
        : { orderBy?: AuthorizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthorizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthorizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Authorization model
   */
  readonly fields: AuthorizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Authorization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthorizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Authorization$userArgs<ExtArgs> = {}>(args?: Subset<T, Authorization$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Authorization model
   */
  interface AuthorizationFieldRefs {
    readonly id: FieldRef<"Authorization", 'String'>
    readonly userHashedId: FieldRef<"Authorization", 'String'>
    readonly agentId: FieldRef<"Authorization", 'String'>
    readonly signature: FieldRef<"Authorization", 'String'>
    readonly maxSpend: FieldRef<"Authorization", 'String'>
    readonly expiresAt: FieldRef<"Authorization", 'Int'>
    readonly isActive: FieldRef<"Authorization", 'Boolean'>
    readonly createdAt: FieldRef<"Authorization", 'DateTime'>
    readonly updatedAt: FieldRef<"Authorization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Authorization findUnique
   */
  export type AuthorizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authorization
     */
    select?: AuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authorization
     */
    omit?: AuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationInclude<ExtArgs> | null
    /**
     * Filter, which Authorization to fetch.
     */
    where: AuthorizationWhereUniqueInput
  }

  /**
   * Authorization findUniqueOrThrow
   */
  export type AuthorizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authorization
     */
    select?: AuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authorization
     */
    omit?: AuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationInclude<ExtArgs> | null
    /**
     * Filter, which Authorization to fetch.
     */
    where: AuthorizationWhereUniqueInput
  }

  /**
   * Authorization findFirst
   */
  export type AuthorizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authorization
     */
    select?: AuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authorization
     */
    omit?: AuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationInclude<ExtArgs> | null
    /**
     * Filter, which Authorization to fetch.
     */
    where?: AuthorizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authorizations to fetch.
     */
    orderBy?: AuthorizationOrderByWithRelationInput | AuthorizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Authorizations.
     */
    cursor?: AuthorizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authorizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authorizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authorizations.
     */
    distinct?: AuthorizationScalarFieldEnum | AuthorizationScalarFieldEnum[]
  }

  /**
   * Authorization findFirstOrThrow
   */
  export type AuthorizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authorization
     */
    select?: AuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authorization
     */
    omit?: AuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationInclude<ExtArgs> | null
    /**
     * Filter, which Authorization to fetch.
     */
    where?: AuthorizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authorizations to fetch.
     */
    orderBy?: AuthorizationOrderByWithRelationInput | AuthorizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Authorizations.
     */
    cursor?: AuthorizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authorizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authorizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authorizations.
     */
    distinct?: AuthorizationScalarFieldEnum | AuthorizationScalarFieldEnum[]
  }

  /**
   * Authorization findMany
   */
  export type AuthorizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authorization
     */
    select?: AuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authorization
     */
    omit?: AuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationInclude<ExtArgs> | null
    /**
     * Filter, which Authorizations to fetch.
     */
    where?: AuthorizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authorizations to fetch.
     */
    orderBy?: AuthorizationOrderByWithRelationInput | AuthorizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Authorizations.
     */
    cursor?: AuthorizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authorizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authorizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authorizations.
     */
    distinct?: AuthorizationScalarFieldEnum | AuthorizationScalarFieldEnum[]
  }

  /**
   * Authorization create
   */
  export type AuthorizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authorization
     */
    select?: AuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authorization
     */
    omit?: AuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Authorization.
     */
    data: XOR<AuthorizationCreateInput, AuthorizationUncheckedCreateInput>
  }

  /**
   * Authorization createMany
   */
  export type AuthorizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Authorizations.
     */
    data: AuthorizationCreateManyInput | AuthorizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Authorization createManyAndReturn
   */
  export type AuthorizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authorization
     */
    select?: AuthorizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Authorization
     */
    omit?: AuthorizationOmit<ExtArgs> | null
    /**
     * The data used to create many Authorizations.
     */
    data: AuthorizationCreateManyInput | AuthorizationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Authorization update
   */
  export type AuthorizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authorization
     */
    select?: AuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authorization
     */
    omit?: AuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Authorization.
     */
    data: XOR<AuthorizationUpdateInput, AuthorizationUncheckedUpdateInput>
    /**
     * Choose, which Authorization to update.
     */
    where: AuthorizationWhereUniqueInput
  }

  /**
   * Authorization updateMany
   */
  export type AuthorizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Authorizations.
     */
    data: XOR<AuthorizationUpdateManyMutationInput, AuthorizationUncheckedUpdateManyInput>
    /**
     * Filter which Authorizations to update
     */
    where?: AuthorizationWhereInput
    /**
     * Limit how many Authorizations to update.
     */
    limit?: number
  }

  /**
   * Authorization updateManyAndReturn
   */
  export type AuthorizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authorization
     */
    select?: AuthorizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Authorization
     */
    omit?: AuthorizationOmit<ExtArgs> | null
    /**
     * The data used to update Authorizations.
     */
    data: XOR<AuthorizationUpdateManyMutationInput, AuthorizationUncheckedUpdateManyInput>
    /**
     * Filter which Authorizations to update
     */
    where?: AuthorizationWhereInput
    /**
     * Limit how many Authorizations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Authorization upsert
   */
  export type AuthorizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authorization
     */
    select?: AuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authorization
     */
    omit?: AuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Authorization to update in case it exists.
     */
    where: AuthorizationWhereUniqueInput
    /**
     * In case the Authorization found by the `where` argument doesn't exist, create a new Authorization with this data.
     */
    create: XOR<AuthorizationCreateInput, AuthorizationUncheckedCreateInput>
    /**
     * In case the Authorization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthorizationUpdateInput, AuthorizationUncheckedUpdateInput>
  }

  /**
   * Authorization delete
   */
  export type AuthorizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authorization
     */
    select?: AuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authorization
     */
    omit?: AuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationInclude<ExtArgs> | null
    /**
     * Filter which Authorization to delete.
     */
    where: AuthorizationWhereUniqueInput
  }

  /**
   * Authorization deleteMany
   */
  export type AuthorizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Authorizations to delete
     */
    where?: AuthorizationWhereInput
    /**
     * Limit how many Authorizations to delete.
     */
    limit?: number
  }

  /**
   * Authorization.user
   */
  export type Authorization$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Authorization without action
   */
  export type AuthorizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Authorization
     */
    select?: AuthorizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Authorization
     */
    omit?: AuthorizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationInclude<ExtArgs> | null
  }


  /**
   * Model TaskEscrow
   */

  export type AggregateTaskEscrow = {
    _count: TaskEscrowCountAggregateOutputType | null
    _min: TaskEscrowMinAggregateOutputType | null
    _max: TaskEscrowMaxAggregateOutputType | null
  }

  export type TaskEscrowMinAggregateOutputType = {
    taskId: string | null
    userHashedId: string | null
    amount: string | null
    status: $Enums.TaskEscrowStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskEscrowMaxAggregateOutputType = {
    taskId: string | null
    userHashedId: string | null
    amount: string | null
    status: $Enums.TaskEscrowStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskEscrowCountAggregateOutputType = {
    taskId: number
    userHashedId: number
    amount: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskEscrowMinAggregateInputType = {
    taskId?: true
    userHashedId?: true
    amount?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskEscrowMaxAggregateInputType = {
    taskId?: true
    userHashedId?: true
    amount?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskEscrowCountAggregateInputType = {
    taskId?: true
    userHashedId?: true
    amount?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskEscrowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskEscrow to aggregate.
     */
    where?: TaskEscrowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskEscrows to fetch.
     */
    orderBy?: TaskEscrowOrderByWithRelationInput | TaskEscrowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskEscrowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskEscrows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskEscrows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskEscrows
    **/
    _count?: true | TaskEscrowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskEscrowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskEscrowMaxAggregateInputType
  }

  export type GetTaskEscrowAggregateType<T extends TaskEscrowAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskEscrow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskEscrow[P]>
      : GetScalarType<T[P], AggregateTaskEscrow[P]>
  }




  export type TaskEscrowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskEscrowWhereInput
    orderBy?: TaskEscrowOrderByWithAggregationInput | TaskEscrowOrderByWithAggregationInput[]
    by: TaskEscrowScalarFieldEnum[] | TaskEscrowScalarFieldEnum
    having?: TaskEscrowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskEscrowCountAggregateInputType | true
    _min?: TaskEscrowMinAggregateInputType
    _max?: TaskEscrowMaxAggregateInputType
  }

  export type TaskEscrowGroupByOutputType = {
    taskId: string
    userHashedId: string
    amount: string
    status: $Enums.TaskEscrowStatus
    createdAt: Date
    updatedAt: Date
    _count: TaskEscrowCountAggregateOutputType | null
    _min: TaskEscrowMinAggregateOutputType | null
    _max: TaskEscrowMaxAggregateOutputType | null
  }

  type GetTaskEscrowGroupByPayload<T extends TaskEscrowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskEscrowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskEscrowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskEscrowGroupByOutputType[P]>
            : GetScalarType<T[P], TaskEscrowGroupByOutputType[P]>
        }
      >
    >


  export type TaskEscrowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    taskId?: boolean
    userHashedId?: boolean
    amount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | TaskEscrow$userArgs<ExtArgs>
  }, ExtArgs["result"]["taskEscrow"]>

  export type TaskEscrowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    taskId?: boolean
    userHashedId?: boolean
    amount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | TaskEscrow$userArgs<ExtArgs>
  }, ExtArgs["result"]["taskEscrow"]>

  export type TaskEscrowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    taskId?: boolean
    userHashedId?: boolean
    amount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | TaskEscrow$userArgs<ExtArgs>
  }, ExtArgs["result"]["taskEscrow"]>

  export type TaskEscrowSelectScalar = {
    taskId?: boolean
    userHashedId?: boolean
    amount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskEscrowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"taskId" | "userHashedId" | "amount" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["taskEscrow"]>
  export type TaskEscrowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | TaskEscrow$userArgs<ExtArgs>
  }
  export type TaskEscrowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | TaskEscrow$userArgs<ExtArgs>
  }
  export type TaskEscrowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | TaskEscrow$userArgs<ExtArgs>
  }

  export type $TaskEscrowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskEscrow"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      taskId: string
      userHashedId: string
      amount: string
      status: $Enums.TaskEscrowStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["taskEscrow"]>
    composites: {}
  }

  type TaskEscrowGetPayload<S extends boolean | null | undefined | TaskEscrowDefaultArgs> = $Result.GetResult<Prisma.$TaskEscrowPayload, S>

  type TaskEscrowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskEscrowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskEscrowCountAggregateInputType | true
    }

  export interface TaskEscrowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskEscrow'], meta: { name: 'TaskEscrow' } }
    /**
     * Find zero or one TaskEscrow that matches the filter.
     * @param {TaskEscrowFindUniqueArgs} args - Arguments to find a TaskEscrow
     * @example
     * // Get one TaskEscrow
     * const taskEscrow = await prisma.taskEscrow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskEscrowFindUniqueArgs>(args: SelectSubset<T, TaskEscrowFindUniqueArgs<ExtArgs>>): Prisma__TaskEscrowClient<$Result.GetResult<Prisma.$TaskEscrowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaskEscrow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskEscrowFindUniqueOrThrowArgs} args - Arguments to find a TaskEscrow
     * @example
     * // Get one TaskEscrow
     * const taskEscrow = await prisma.taskEscrow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskEscrowFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskEscrowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskEscrowClient<$Result.GetResult<Prisma.$TaskEscrowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskEscrow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskEscrowFindFirstArgs} args - Arguments to find a TaskEscrow
     * @example
     * // Get one TaskEscrow
     * const taskEscrow = await prisma.taskEscrow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskEscrowFindFirstArgs>(args?: SelectSubset<T, TaskEscrowFindFirstArgs<ExtArgs>>): Prisma__TaskEscrowClient<$Result.GetResult<Prisma.$TaskEscrowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskEscrow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskEscrowFindFirstOrThrowArgs} args - Arguments to find a TaskEscrow
     * @example
     * // Get one TaskEscrow
     * const taskEscrow = await prisma.taskEscrow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskEscrowFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskEscrowFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskEscrowClient<$Result.GetResult<Prisma.$TaskEscrowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaskEscrows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskEscrowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskEscrows
     * const taskEscrows = await prisma.taskEscrow.findMany()
     * 
     * // Get first 10 TaskEscrows
     * const taskEscrows = await prisma.taskEscrow.findMany({ take: 10 })
     * 
     * // Only select the `taskId`
     * const taskEscrowWithTaskIdOnly = await prisma.taskEscrow.findMany({ select: { taskId: true } })
     * 
     */
    findMany<T extends TaskEscrowFindManyArgs>(args?: SelectSubset<T, TaskEscrowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskEscrowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaskEscrow.
     * @param {TaskEscrowCreateArgs} args - Arguments to create a TaskEscrow.
     * @example
     * // Create one TaskEscrow
     * const TaskEscrow = await prisma.taskEscrow.create({
     *   data: {
     *     // ... data to create a TaskEscrow
     *   }
     * })
     * 
     */
    create<T extends TaskEscrowCreateArgs>(args: SelectSubset<T, TaskEscrowCreateArgs<ExtArgs>>): Prisma__TaskEscrowClient<$Result.GetResult<Prisma.$TaskEscrowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaskEscrows.
     * @param {TaskEscrowCreateManyArgs} args - Arguments to create many TaskEscrows.
     * @example
     * // Create many TaskEscrows
     * const taskEscrow = await prisma.taskEscrow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskEscrowCreateManyArgs>(args?: SelectSubset<T, TaskEscrowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskEscrows and returns the data saved in the database.
     * @param {TaskEscrowCreateManyAndReturnArgs} args - Arguments to create many TaskEscrows.
     * @example
     * // Create many TaskEscrows
     * const taskEscrow = await prisma.taskEscrow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskEscrows and only return the `taskId`
     * const taskEscrowWithTaskIdOnly = await prisma.taskEscrow.createManyAndReturn({
     *   select: { taskId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskEscrowCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskEscrowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskEscrowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaskEscrow.
     * @param {TaskEscrowDeleteArgs} args - Arguments to delete one TaskEscrow.
     * @example
     * // Delete one TaskEscrow
     * const TaskEscrow = await prisma.taskEscrow.delete({
     *   where: {
     *     // ... filter to delete one TaskEscrow
     *   }
     * })
     * 
     */
    delete<T extends TaskEscrowDeleteArgs>(args: SelectSubset<T, TaskEscrowDeleteArgs<ExtArgs>>): Prisma__TaskEscrowClient<$Result.GetResult<Prisma.$TaskEscrowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaskEscrow.
     * @param {TaskEscrowUpdateArgs} args - Arguments to update one TaskEscrow.
     * @example
     * // Update one TaskEscrow
     * const taskEscrow = await prisma.taskEscrow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskEscrowUpdateArgs>(args: SelectSubset<T, TaskEscrowUpdateArgs<ExtArgs>>): Prisma__TaskEscrowClient<$Result.GetResult<Prisma.$TaskEscrowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaskEscrows.
     * @param {TaskEscrowDeleteManyArgs} args - Arguments to filter TaskEscrows to delete.
     * @example
     * // Delete a few TaskEscrows
     * const { count } = await prisma.taskEscrow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskEscrowDeleteManyArgs>(args?: SelectSubset<T, TaskEscrowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskEscrows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskEscrowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskEscrows
     * const taskEscrow = await prisma.taskEscrow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskEscrowUpdateManyArgs>(args: SelectSubset<T, TaskEscrowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskEscrows and returns the data updated in the database.
     * @param {TaskEscrowUpdateManyAndReturnArgs} args - Arguments to update many TaskEscrows.
     * @example
     * // Update many TaskEscrows
     * const taskEscrow = await prisma.taskEscrow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaskEscrows and only return the `taskId`
     * const taskEscrowWithTaskIdOnly = await prisma.taskEscrow.updateManyAndReturn({
     *   select: { taskId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskEscrowUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskEscrowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskEscrowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaskEscrow.
     * @param {TaskEscrowUpsertArgs} args - Arguments to update or create a TaskEscrow.
     * @example
     * // Update or create a TaskEscrow
     * const taskEscrow = await prisma.taskEscrow.upsert({
     *   create: {
     *     // ... data to create a TaskEscrow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskEscrow we want to update
     *   }
     * })
     */
    upsert<T extends TaskEscrowUpsertArgs>(args: SelectSubset<T, TaskEscrowUpsertArgs<ExtArgs>>): Prisma__TaskEscrowClient<$Result.GetResult<Prisma.$TaskEscrowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaskEscrows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskEscrowCountArgs} args - Arguments to filter TaskEscrows to count.
     * @example
     * // Count the number of TaskEscrows
     * const count = await prisma.taskEscrow.count({
     *   where: {
     *     // ... the filter for the TaskEscrows we want to count
     *   }
     * })
    **/
    count<T extends TaskEscrowCountArgs>(
      args?: Subset<T, TaskEscrowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskEscrowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskEscrow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskEscrowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskEscrowAggregateArgs>(args: Subset<T, TaskEscrowAggregateArgs>): Prisma.PrismaPromise<GetTaskEscrowAggregateType<T>>

    /**
     * Group by TaskEscrow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskEscrowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskEscrowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskEscrowGroupByArgs['orderBy'] }
        : { orderBy?: TaskEscrowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskEscrowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskEscrowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskEscrow model
   */
  readonly fields: TaskEscrowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskEscrow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskEscrowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends TaskEscrow$userArgs<ExtArgs> = {}>(args?: Subset<T, TaskEscrow$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskEscrow model
   */
  interface TaskEscrowFieldRefs {
    readonly taskId: FieldRef<"TaskEscrow", 'String'>
    readonly userHashedId: FieldRef<"TaskEscrow", 'String'>
    readonly amount: FieldRef<"TaskEscrow", 'String'>
    readonly status: FieldRef<"TaskEscrow", 'TaskEscrowStatus'>
    readonly createdAt: FieldRef<"TaskEscrow", 'DateTime'>
    readonly updatedAt: FieldRef<"TaskEscrow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskEscrow findUnique
   */
  export type TaskEscrowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEscrow
     */
    select?: TaskEscrowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEscrow
     */
    omit?: TaskEscrowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEscrowInclude<ExtArgs> | null
    /**
     * Filter, which TaskEscrow to fetch.
     */
    where: TaskEscrowWhereUniqueInput
  }

  /**
   * TaskEscrow findUniqueOrThrow
   */
  export type TaskEscrowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEscrow
     */
    select?: TaskEscrowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEscrow
     */
    omit?: TaskEscrowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEscrowInclude<ExtArgs> | null
    /**
     * Filter, which TaskEscrow to fetch.
     */
    where: TaskEscrowWhereUniqueInput
  }

  /**
   * TaskEscrow findFirst
   */
  export type TaskEscrowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEscrow
     */
    select?: TaskEscrowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEscrow
     */
    omit?: TaskEscrowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEscrowInclude<ExtArgs> | null
    /**
     * Filter, which TaskEscrow to fetch.
     */
    where?: TaskEscrowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskEscrows to fetch.
     */
    orderBy?: TaskEscrowOrderByWithRelationInput | TaskEscrowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskEscrows.
     */
    cursor?: TaskEscrowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskEscrows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskEscrows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskEscrows.
     */
    distinct?: TaskEscrowScalarFieldEnum | TaskEscrowScalarFieldEnum[]
  }

  /**
   * TaskEscrow findFirstOrThrow
   */
  export type TaskEscrowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEscrow
     */
    select?: TaskEscrowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEscrow
     */
    omit?: TaskEscrowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEscrowInclude<ExtArgs> | null
    /**
     * Filter, which TaskEscrow to fetch.
     */
    where?: TaskEscrowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskEscrows to fetch.
     */
    orderBy?: TaskEscrowOrderByWithRelationInput | TaskEscrowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskEscrows.
     */
    cursor?: TaskEscrowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskEscrows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskEscrows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskEscrows.
     */
    distinct?: TaskEscrowScalarFieldEnum | TaskEscrowScalarFieldEnum[]
  }

  /**
   * TaskEscrow findMany
   */
  export type TaskEscrowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEscrow
     */
    select?: TaskEscrowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEscrow
     */
    omit?: TaskEscrowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEscrowInclude<ExtArgs> | null
    /**
     * Filter, which TaskEscrows to fetch.
     */
    where?: TaskEscrowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskEscrows to fetch.
     */
    orderBy?: TaskEscrowOrderByWithRelationInput | TaskEscrowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskEscrows.
     */
    cursor?: TaskEscrowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskEscrows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskEscrows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskEscrows.
     */
    distinct?: TaskEscrowScalarFieldEnum | TaskEscrowScalarFieldEnum[]
  }

  /**
   * TaskEscrow create
   */
  export type TaskEscrowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEscrow
     */
    select?: TaskEscrowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEscrow
     */
    omit?: TaskEscrowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEscrowInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskEscrow.
     */
    data: XOR<TaskEscrowCreateInput, TaskEscrowUncheckedCreateInput>
  }

  /**
   * TaskEscrow createMany
   */
  export type TaskEscrowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskEscrows.
     */
    data: TaskEscrowCreateManyInput | TaskEscrowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskEscrow createManyAndReturn
   */
  export type TaskEscrowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEscrow
     */
    select?: TaskEscrowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEscrow
     */
    omit?: TaskEscrowOmit<ExtArgs> | null
    /**
     * The data used to create many TaskEscrows.
     */
    data: TaskEscrowCreateManyInput | TaskEscrowCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEscrowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskEscrow update
   */
  export type TaskEscrowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEscrow
     */
    select?: TaskEscrowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEscrow
     */
    omit?: TaskEscrowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEscrowInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskEscrow.
     */
    data: XOR<TaskEscrowUpdateInput, TaskEscrowUncheckedUpdateInput>
    /**
     * Choose, which TaskEscrow to update.
     */
    where: TaskEscrowWhereUniqueInput
  }

  /**
   * TaskEscrow updateMany
   */
  export type TaskEscrowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskEscrows.
     */
    data: XOR<TaskEscrowUpdateManyMutationInput, TaskEscrowUncheckedUpdateManyInput>
    /**
     * Filter which TaskEscrows to update
     */
    where?: TaskEscrowWhereInput
    /**
     * Limit how many TaskEscrows to update.
     */
    limit?: number
  }

  /**
   * TaskEscrow updateManyAndReturn
   */
  export type TaskEscrowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEscrow
     */
    select?: TaskEscrowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEscrow
     */
    omit?: TaskEscrowOmit<ExtArgs> | null
    /**
     * The data used to update TaskEscrows.
     */
    data: XOR<TaskEscrowUpdateManyMutationInput, TaskEscrowUncheckedUpdateManyInput>
    /**
     * Filter which TaskEscrows to update
     */
    where?: TaskEscrowWhereInput
    /**
     * Limit how many TaskEscrows to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEscrowIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskEscrow upsert
   */
  export type TaskEscrowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEscrow
     */
    select?: TaskEscrowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEscrow
     */
    omit?: TaskEscrowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEscrowInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskEscrow to update in case it exists.
     */
    where: TaskEscrowWhereUniqueInput
    /**
     * In case the TaskEscrow found by the `where` argument doesn't exist, create a new TaskEscrow with this data.
     */
    create: XOR<TaskEscrowCreateInput, TaskEscrowUncheckedCreateInput>
    /**
     * In case the TaskEscrow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskEscrowUpdateInput, TaskEscrowUncheckedUpdateInput>
  }

  /**
   * TaskEscrow delete
   */
  export type TaskEscrowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEscrow
     */
    select?: TaskEscrowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEscrow
     */
    omit?: TaskEscrowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEscrowInclude<ExtArgs> | null
    /**
     * Filter which TaskEscrow to delete.
     */
    where: TaskEscrowWhereUniqueInput
  }

  /**
   * TaskEscrow deleteMany
   */
  export type TaskEscrowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskEscrows to delete
     */
    where?: TaskEscrowWhereInput
    /**
     * Limit how many TaskEscrows to delete.
     */
    limit?: number
  }

  /**
   * TaskEscrow.user
   */
  export type TaskEscrow$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TaskEscrow without action
   */
  export type TaskEscrowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskEscrow
     */
    select?: TaskEscrowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskEscrow
     */
    omit?: TaskEscrowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskEscrowInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userHashedId: string | null
    action: string | null
    txHash: string | null
    nonce: string | null
    status: $Enums.AuditLogStatus | null
    gasUsed: string | null
    timestamp: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userHashedId: string | null
    action: string | null
    txHash: string | null
    nonce: string | null
    status: $Enums.AuditLogStatus | null
    gasUsed: string | null
    timestamp: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userHashedId: number
    action: number
    txHash: number
    nonce: number
    status: number
    gasUsed: number
    timestamp: number
    details: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userHashedId?: true
    action?: true
    txHash?: true
    nonce?: true
    status?: true
    gasUsed?: true
    timestamp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userHashedId?: true
    action?: true
    txHash?: true
    nonce?: true
    status?: true
    gasUsed?: true
    timestamp?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userHashedId?: true
    action?: true
    txHash?: true
    nonce?: true
    status?: true
    gasUsed?: true
    timestamp?: true
    details?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userHashedId: string
    action: string
    txHash: string | null
    nonce: string | null
    status: $Enums.AuditLogStatus
    gasUsed: string | null
    timestamp: Date
    details: JsonValue | null
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userHashedId?: boolean
    action?: boolean
    txHash?: boolean
    nonce?: boolean
    status?: boolean
    gasUsed?: boolean
    timestamp?: boolean
    details?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userHashedId?: boolean
    action?: boolean
    txHash?: boolean
    nonce?: boolean
    status?: boolean
    gasUsed?: boolean
    timestamp?: boolean
    details?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userHashedId?: boolean
    action?: boolean
    txHash?: boolean
    nonce?: boolean
    status?: boolean
    gasUsed?: boolean
    timestamp?: boolean
    details?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userHashedId?: boolean
    action?: boolean
    txHash?: boolean
    nonce?: boolean
    status?: boolean
    gasUsed?: boolean
    timestamp?: boolean
    details?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userHashedId" | "action" | "txHash" | "nonce" | "status" | "gasUsed" | "timestamp" | "details", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userHashedId: string
      action: string
      txHash: string | null
      nonce: string | null
      status: $Enums.AuditLogStatus
      gasUsed: string | null
      timestamp: Date
      details: Prisma.JsonValue | null
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userHashedId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly txHash: FieldRef<"AuditLog", 'String'>
    readonly nonce: FieldRef<"AuditLog", 'String'>
    readonly status: FieldRef<"AuditLog", 'AuditLogStatus'>
    readonly gasUsed: FieldRef<"AuditLog", 'String'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
    readonly details: FieldRef<"AuditLog", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    hashedId: 'hashedId',
    eoaAddress: 'eoaAddress',
    walletAddress: 'walletAddress',
    personality: 'personality',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AuthorizationScalarFieldEnum: {
    id: 'id',
    userHashedId: 'userHashedId',
    agentId: 'agentId',
    signature: 'signature',
    maxSpend: 'maxSpend',
    expiresAt: 'expiresAt',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AuthorizationScalarFieldEnum = (typeof AuthorizationScalarFieldEnum)[keyof typeof AuthorizationScalarFieldEnum]


  export const TaskEscrowScalarFieldEnum: {
    taskId: 'taskId',
    userHashedId: 'userHashedId',
    amount: 'amount',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskEscrowScalarFieldEnum = (typeof TaskEscrowScalarFieldEnum)[keyof typeof TaskEscrowScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userHashedId: 'userHashedId',
    action: 'action',
    txHash: 'txHash',
    nonce: 'nonce',
    status: 'status',
    gasUsed: 'gasUsed',
    timestamp: 'timestamp',
    details: 'details'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Personality'
   */
  export type EnumPersonalityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Personality'>
    


  /**
   * Reference to a field of type 'Personality[]'
   */
  export type ListEnumPersonalityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Personality[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'TaskEscrowStatus'
   */
  export type EnumTaskEscrowStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskEscrowStatus'>
    


  /**
   * Reference to a field of type 'TaskEscrowStatus[]'
   */
  export type ListEnumTaskEscrowStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskEscrowStatus[]'>
    


  /**
   * Reference to a field of type 'AuditLogStatus'
   */
  export type EnumAuditLogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditLogStatus'>
    


  /**
   * Reference to a field of type 'AuditLogStatus[]'
   */
  export type ListEnumAuditLogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditLogStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    hashedId?: StringFilter<"User"> | string
    eoaAddress?: StringFilter<"User"> | string
    walletAddress?: StringNullableFilter<"User"> | string | null
    personality?: EnumPersonalityFilter<"User"> | $Enums.Personality
    createdAt?: DateTimeFilter<"User"> | Date | string
    authorizations?: AuthorizationListRelationFilter
    taskEscrows?: TaskEscrowListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    hashedId?: SortOrder
    eoaAddress?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    personality?: SortOrder
    createdAt?: SortOrder
    authorizations?: AuthorizationOrderByRelationAggregateInput
    taskEscrows?: TaskEscrowOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    hashedId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    eoaAddress?: StringFilter<"User"> | string
    walletAddress?: StringNullableFilter<"User"> | string | null
    personality?: EnumPersonalityFilter<"User"> | $Enums.Personality
    createdAt?: DateTimeFilter<"User"> | Date | string
    authorizations?: AuthorizationListRelationFilter
    taskEscrows?: TaskEscrowListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "hashedId">

  export type UserOrderByWithAggregationInput = {
    hashedId?: SortOrder
    eoaAddress?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    personality?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    hashedId?: StringWithAggregatesFilter<"User"> | string
    eoaAddress?: StringWithAggregatesFilter<"User"> | string
    walletAddress?: StringNullableWithAggregatesFilter<"User"> | string | null
    personality?: EnumPersonalityWithAggregatesFilter<"User"> | $Enums.Personality
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AuthorizationWhereInput = {
    AND?: AuthorizationWhereInput | AuthorizationWhereInput[]
    OR?: AuthorizationWhereInput[]
    NOT?: AuthorizationWhereInput | AuthorizationWhereInput[]
    id?: StringFilter<"Authorization"> | string
    userHashedId?: StringFilter<"Authorization"> | string
    agentId?: StringFilter<"Authorization"> | string
    signature?: StringFilter<"Authorization"> | string
    maxSpend?: StringFilter<"Authorization"> | string
    expiresAt?: IntFilter<"Authorization"> | number
    isActive?: BoolFilter<"Authorization"> | boolean
    createdAt?: DateTimeFilter<"Authorization"> | Date | string
    updatedAt?: DateTimeFilter<"Authorization"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AuthorizationOrderByWithRelationInput = {
    id?: SortOrder
    userHashedId?: SortOrder
    agentId?: SortOrder
    signature?: SortOrder
    maxSpend?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuthorizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuthorizationWhereInput | AuthorizationWhereInput[]
    OR?: AuthorizationWhereInput[]
    NOT?: AuthorizationWhereInput | AuthorizationWhereInput[]
    userHashedId?: StringFilter<"Authorization"> | string
    agentId?: StringFilter<"Authorization"> | string
    signature?: StringFilter<"Authorization"> | string
    maxSpend?: StringFilter<"Authorization"> | string
    expiresAt?: IntFilter<"Authorization"> | number
    isActive?: BoolFilter<"Authorization"> | boolean
    createdAt?: DateTimeFilter<"Authorization"> | Date | string
    updatedAt?: DateTimeFilter<"Authorization"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuthorizationOrderByWithAggregationInput = {
    id?: SortOrder
    userHashedId?: SortOrder
    agentId?: SortOrder
    signature?: SortOrder
    maxSpend?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AuthorizationCountOrderByAggregateInput
    _avg?: AuthorizationAvgOrderByAggregateInput
    _max?: AuthorizationMaxOrderByAggregateInput
    _min?: AuthorizationMinOrderByAggregateInput
    _sum?: AuthorizationSumOrderByAggregateInput
  }

  export type AuthorizationScalarWhereWithAggregatesInput = {
    AND?: AuthorizationScalarWhereWithAggregatesInput | AuthorizationScalarWhereWithAggregatesInput[]
    OR?: AuthorizationScalarWhereWithAggregatesInput[]
    NOT?: AuthorizationScalarWhereWithAggregatesInput | AuthorizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Authorization"> | string
    userHashedId?: StringWithAggregatesFilter<"Authorization"> | string
    agentId?: StringWithAggregatesFilter<"Authorization"> | string
    signature?: StringWithAggregatesFilter<"Authorization"> | string
    maxSpend?: StringWithAggregatesFilter<"Authorization"> | string
    expiresAt?: IntWithAggregatesFilter<"Authorization"> | number
    isActive?: BoolWithAggregatesFilter<"Authorization"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Authorization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Authorization"> | Date | string
  }

  export type TaskEscrowWhereInput = {
    AND?: TaskEscrowWhereInput | TaskEscrowWhereInput[]
    OR?: TaskEscrowWhereInput[]
    NOT?: TaskEscrowWhereInput | TaskEscrowWhereInput[]
    taskId?: StringFilter<"TaskEscrow"> | string
    userHashedId?: StringFilter<"TaskEscrow"> | string
    amount?: StringFilter<"TaskEscrow"> | string
    status?: EnumTaskEscrowStatusFilter<"TaskEscrow"> | $Enums.TaskEscrowStatus
    createdAt?: DateTimeFilter<"TaskEscrow"> | Date | string
    updatedAt?: DateTimeFilter<"TaskEscrow"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type TaskEscrowOrderByWithRelationInput = {
    taskId?: SortOrder
    userHashedId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TaskEscrowWhereUniqueInput = Prisma.AtLeast<{
    taskId?: string
    AND?: TaskEscrowWhereInput | TaskEscrowWhereInput[]
    OR?: TaskEscrowWhereInput[]
    NOT?: TaskEscrowWhereInput | TaskEscrowWhereInput[]
    userHashedId?: StringFilter<"TaskEscrow"> | string
    amount?: StringFilter<"TaskEscrow"> | string
    status?: EnumTaskEscrowStatusFilter<"TaskEscrow"> | $Enums.TaskEscrowStatus
    createdAt?: DateTimeFilter<"TaskEscrow"> | Date | string
    updatedAt?: DateTimeFilter<"TaskEscrow"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "taskId">

  export type TaskEscrowOrderByWithAggregationInput = {
    taskId?: SortOrder
    userHashedId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskEscrowCountOrderByAggregateInput
    _max?: TaskEscrowMaxOrderByAggregateInput
    _min?: TaskEscrowMinOrderByAggregateInput
  }

  export type TaskEscrowScalarWhereWithAggregatesInput = {
    AND?: TaskEscrowScalarWhereWithAggregatesInput | TaskEscrowScalarWhereWithAggregatesInput[]
    OR?: TaskEscrowScalarWhereWithAggregatesInput[]
    NOT?: TaskEscrowScalarWhereWithAggregatesInput | TaskEscrowScalarWhereWithAggregatesInput[]
    taskId?: StringWithAggregatesFilter<"TaskEscrow"> | string
    userHashedId?: StringWithAggregatesFilter<"TaskEscrow"> | string
    amount?: StringWithAggregatesFilter<"TaskEscrow"> | string
    status?: EnumTaskEscrowStatusWithAggregatesFilter<"TaskEscrow"> | $Enums.TaskEscrowStatus
    createdAt?: DateTimeWithAggregatesFilter<"TaskEscrow"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TaskEscrow"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userHashedId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    txHash?: StringNullableFilter<"AuditLog"> | string | null
    nonce?: StringNullableFilter<"AuditLog"> | string | null
    status?: EnumAuditLogStatusFilter<"AuditLog"> | $Enums.AuditLogStatus
    gasUsed?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    details?: JsonNullableFilter<"AuditLog">
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userHashedId?: SortOrder
    action?: SortOrder
    txHash?: SortOrderInput | SortOrder
    nonce?: SortOrderInput | SortOrder
    status?: SortOrder
    gasUsed?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    details?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userHashedId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    txHash?: StringNullableFilter<"AuditLog"> | string | null
    nonce?: StringNullableFilter<"AuditLog"> | string | null
    status?: EnumAuditLogStatusFilter<"AuditLog"> | $Enums.AuditLogStatus
    gasUsed?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    details?: JsonNullableFilter<"AuditLog">
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userHashedId?: SortOrder
    action?: SortOrder
    txHash?: SortOrderInput | SortOrder
    nonce?: SortOrderInput | SortOrder
    status?: SortOrder
    gasUsed?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    details?: SortOrderInput | SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userHashedId?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    txHash?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    nonce?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    status?: EnumAuditLogStatusWithAggregatesFilter<"AuditLog"> | $Enums.AuditLogStatus
    gasUsed?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
    details?: JsonNullableWithAggregatesFilter<"AuditLog">
  }

  export type UserCreateInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    personality: $Enums.Personality
    createdAt?: Date | string
    authorizations?: AuthorizationCreateNestedManyWithoutUserInput
    taskEscrows?: TaskEscrowCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    personality: $Enums.Personality
    createdAt?: Date | string
    authorizations?: AuthorizationUncheckedCreateNestedManyWithoutUserInput
    taskEscrows?: TaskEscrowUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: EnumPersonalityFieldUpdateOperationsInput | $Enums.Personality
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorizations?: AuthorizationUpdateManyWithoutUserNestedInput
    taskEscrows?: TaskEscrowUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: EnumPersonalityFieldUpdateOperationsInput | $Enums.Personality
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorizations?: AuthorizationUncheckedUpdateManyWithoutUserNestedInput
    taskEscrows?: TaskEscrowUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    personality: $Enums.Personality
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: EnumPersonalityFieldUpdateOperationsInput | $Enums.Personality
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: EnumPersonalityFieldUpdateOperationsInput | $Enums.Personality
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthorizationCreateInput = {
    id?: string
    agentId: string
    signature: string
    maxSpend: string
    expiresAt: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutAuthorizationsInput
  }

  export type AuthorizationUncheckedCreateInput = {
    id?: string
    userHashedId: string
    agentId: string
    signature: string
    maxSpend: string
    expiresAt: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthorizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    signature?: StringFieldUpdateOperationsInput | string
    maxSpend?: StringFieldUpdateOperationsInput | string
    expiresAt?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuthorizationsNestedInput
  }

  export type AuthorizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userHashedId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    signature?: StringFieldUpdateOperationsInput | string
    maxSpend?: StringFieldUpdateOperationsInput | string
    expiresAt?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthorizationCreateManyInput = {
    id?: string
    userHashedId: string
    agentId: string
    signature: string
    maxSpend: string
    expiresAt: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthorizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    signature?: StringFieldUpdateOperationsInput | string
    maxSpend?: StringFieldUpdateOperationsInput | string
    expiresAt?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthorizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userHashedId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    signature?: StringFieldUpdateOperationsInput | string
    maxSpend?: StringFieldUpdateOperationsInput | string
    expiresAt?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskEscrowCreateInput = {
    taskId: string
    amount: string
    status: $Enums.TaskEscrowStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutTaskEscrowsInput
  }

  export type TaskEscrowUncheckedCreateInput = {
    taskId: string
    userHashedId: string
    amount: string
    status: $Enums.TaskEscrowStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskEscrowUpdateInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskEscrowStatusFieldUpdateOperationsInput | $Enums.TaskEscrowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutTaskEscrowsNestedInput
  }

  export type TaskEscrowUncheckedUpdateInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    userHashedId?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskEscrowStatusFieldUpdateOperationsInput | $Enums.TaskEscrowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskEscrowCreateManyInput = {
    taskId: string
    userHashedId: string
    amount: string
    status: $Enums.TaskEscrowStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskEscrowUpdateManyMutationInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskEscrowStatusFieldUpdateOperationsInput | $Enums.TaskEscrowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskEscrowUncheckedUpdateManyInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    userHashedId?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskEscrowStatusFieldUpdateOperationsInput | $Enums.TaskEscrowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    txHash?: string | null
    nonce?: string | null
    status?: $Enums.AuditLogStatus
    gasUsed?: string | null
    timestamp?: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    user?: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userHashedId: string
    action: string
    txHash?: string | null
    nonce?: string | null
    status?: $Enums.AuditLogStatus
    gasUsed?: string | null
    timestamp?: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAuditLogStatusFieldUpdateOperationsInput | $Enums.AuditLogStatus
    gasUsed?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userHashedId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAuditLogStatusFieldUpdateOperationsInput | $Enums.AuditLogStatus
    gasUsed?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userHashedId: string
    action: string
    txHash?: string | null
    nonce?: string | null
    status?: $Enums.AuditLogStatus
    gasUsed?: string | null
    timestamp?: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAuditLogStatusFieldUpdateOperationsInput | $Enums.AuditLogStatus
    gasUsed?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userHashedId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAuditLogStatusFieldUpdateOperationsInput | $Enums.AuditLogStatus
    gasUsed?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumPersonalityFilter<$PrismaModel = never> = {
    equals?: $Enums.Personality | EnumPersonalityFieldRefInput<$PrismaModel>
    in?: $Enums.Personality[] | ListEnumPersonalityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Personality[] | ListEnumPersonalityFieldRefInput<$PrismaModel>
    not?: NestedEnumPersonalityFilter<$PrismaModel> | $Enums.Personality
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AuthorizationListRelationFilter = {
    every?: AuthorizationWhereInput
    some?: AuthorizationWhereInput
    none?: AuthorizationWhereInput
  }

  export type TaskEscrowListRelationFilter = {
    every?: TaskEscrowWhereInput
    some?: TaskEscrowWhereInput
    none?: TaskEscrowWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AuthorizationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskEscrowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    hashedId?: SortOrder
    eoaAddress?: SortOrder
    walletAddress?: SortOrder
    personality?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    hashedId?: SortOrder
    eoaAddress?: SortOrder
    walletAddress?: SortOrder
    personality?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    hashedId?: SortOrder
    eoaAddress?: SortOrder
    walletAddress?: SortOrder
    personality?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumPersonalityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Personality | EnumPersonalityFieldRefInput<$PrismaModel>
    in?: $Enums.Personality[] | ListEnumPersonalityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Personality[] | ListEnumPersonalityFieldRefInput<$PrismaModel>
    not?: NestedEnumPersonalityWithAggregatesFilter<$PrismaModel> | $Enums.Personality
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPersonalityFilter<$PrismaModel>
    _max?: NestedEnumPersonalityFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AuthorizationCountOrderByAggregateInput = {
    id?: SortOrder
    userHashedId?: SortOrder
    agentId?: SortOrder
    signature?: SortOrder
    maxSpend?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthorizationAvgOrderByAggregateInput = {
    expiresAt?: SortOrder
  }

  export type AuthorizationMaxOrderByAggregateInput = {
    id?: SortOrder
    userHashedId?: SortOrder
    agentId?: SortOrder
    signature?: SortOrder
    maxSpend?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthorizationMinOrderByAggregateInput = {
    id?: SortOrder
    userHashedId?: SortOrder
    agentId?: SortOrder
    signature?: SortOrder
    maxSpend?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuthorizationSumOrderByAggregateInput = {
    expiresAt?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumTaskEscrowStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskEscrowStatus | EnumTaskEscrowStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskEscrowStatus[] | ListEnumTaskEscrowStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskEscrowStatus[] | ListEnumTaskEscrowStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskEscrowStatusFilter<$PrismaModel> | $Enums.TaskEscrowStatus
  }

  export type TaskEscrowCountOrderByAggregateInput = {
    taskId?: SortOrder
    userHashedId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskEscrowMaxOrderByAggregateInput = {
    taskId?: SortOrder
    userHashedId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskEscrowMinOrderByAggregateInput = {
    taskId?: SortOrder
    userHashedId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTaskEscrowStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskEscrowStatus | EnumTaskEscrowStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskEscrowStatus[] | ListEnumTaskEscrowStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskEscrowStatus[] | ListEnumTaskEscrowStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskEscrowStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskEscrowStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskEscrowStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskEscrowStatusFilter<$PrismaModel>
  }

  export type EnumAuditLogStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditLogStatus | EnumAuditLogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AuditLogStatus[] | ListEnumAuditLogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditLogStatus[] | ListEnumAuditLogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditLogStatusFilter<$PrismaModel> | $Enums.AuditLogStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userHashedId?: SortOrder
    action?: SortOrder
    txHash?: SortOrder
    nonce?: SortOrder
    status?: SortOrder
    gasUsed?: SortOrder
    timestamp?: SortOrder
    details?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userHashedId?: SortOrder
    action?: SortOrder
    txHash?: SortOrder
    nonce?: SortOrder
    status?: SortOrder
    gasUsed?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userHashedId?: SortOrder
    action?: SortOrder
    txHash?: SortOrder
    nonce?: SortOrder
    status?: SortOrder
    gasUsed?: SortOrder
    timestamp?: SortOrder
  }

  export type EnumAuditLogStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditLogStatus | EnumAuditLogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AuditLogStatus[] | ListEnumAuditLogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditLogStatus[] | ListEnumAuditLogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditLogStatusWithAggregatesFilter<$PrismaModel> | $Enums.AuditLogStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditLogStatusFilter<$PrismaModel>
    _max?: NestedEnumAuditLogStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type AuthorizationCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthorizationCreateWithoutUserInput, AuthorizationUncheckedCreateWithoutUserInput> | AuthorizationCreateWithoutUserInput[] | AuthorizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthorizationCreateOrConnectWithoutUserInput | AuthorizationCreateOrConnectWithoutUserInput[]
    createMany?: AuthorizationCreateManyUserInputEnvelope
    connect?: AuthorizationWhereUniqueInput | AuthorizationWhereUniqueInput[]
  }

  export type TaskEscrowCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskEscrowCreateWithoutUserInput, TaskEscrowUncheckedCreateWithoutUserInput> | TaskEscrowCreateWithoutUserInput[] | TaskEscrowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskEscrowCreateOrConnectWithoutUserInput | TaskEscrowCreateOrConnectWithoutUserInput[]
    createMany?: TaskEscrowCreateManyUserInputEnvelope
    connect?: TaskEscrowWhereUniqueInput | TaskEscrowWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type AuthorizationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthorizationCreateWithoutUserInput, AuthorizationUncheckedCreateWithoutUserInput> | AuthorizationCreateWithoutUserInput[] | AuthorizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthorizationCreateOrConnectWithoutUserInput | AuthorizationCreateOrConnectWithoutUserInput[]
    createMany?: AuthorizationCreateManyUserInputEnvelope
    connect?: AuthorizationWhereUniqueInput | AuthorizationWhereUniqueInput[]
  }

  export type TaskEscrowUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskEscrowCreateWithoutUserInput, TaskEscrowUncheckedCreateWithoutUserInput> | TaskEscrowCreateWithoutUserInput[] | TaskEscrowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskEscrowCreateOrConnectWithoutUserInput | TaskEscrowCreateOrConnectWithoutUserInput[]
    createMany?: TaskEscrowCreateManyUserInputEnvelope
    connect?: TaskEscrowWhereUniqueInput | TaskEscrowWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumPersonalityFieldUpdateOperationsInput = {
    set?: $Enums.Personality
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AuthorizationUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthorizationCreateWithoutUserInput, AuthorizationUncheckedCreateWithoutUserInput> | AuthorizationCreateWithoutUserInput[] | AuthorizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthorizationCreateOrConnectWithoutUserInput | AuthorizationCreateOrConnectWithoutUserInput[]
    upsert?: AuthorizationUpsertWithWhereUniqueWithoutUserInput | AuthorizationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthorizationCreateManyUserInputEnvelope
    set?: AuthorizationWhereUniqueInput | AuthorizationWhereUniqueInput[]
    disconnect?: AuthorizationWhereUniqueInput | AuthorizationWhereUniqueInput[]
    delete?: AuthorizationWhereUniqueInput | AuthorizationWhereUniqueInput[]
    connect?: AuthorizationWhereUniqueInput | AuthorizationWhereUniqueInput[]
    update?: AuthorizationUpdateWithWhereUniqueWithoutUserInput | AuthorizationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthorizationUpdateManyWithWhereWithoutUserInput | AuthorizationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthorizationScalarWhereInput | AuthorizationScalarWhereInput[]
  }

  export type TaskEscrowUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskEscrowCreateWithoutUserInput, TaskEscrowUncheckedCreateWithoutUserInput> | TaskEscrowCreateWithoutUserInput[] | TaskEscrowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskEscrowCreateOrConnectWithoutUserInput | TaskEscrowCreateOrConnectWithoutUserInput[]
    upsert?: TaskEscrowUpsertWithWhereUniqueWithoutUserInput | TaskEscrowUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskEscrowCreateManyUserInputEnvelope
    set?: TaskEscrowWhereUniqueInput | TaskEscrowWhereUniqueInput[]
    disconnect?: TaskEscrowWhereUniqueInput | TaskEscrowWhereUniqueInput[]
    delete?: TaskEscrowWhereUniqueInput | TaskEscrowWhereUniqueInput[]
    connect?: TaskEscrowWhereUniqueInput | TaskEscrowWhereUniqueInput[]
    update?: TaskEscrowUpdateWithWhereUniqueWithoutUserInput | TaskEscrowUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskEscrowUpdateManyWithWhereWithoutUserInput | TaskEscrowUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskEscrowScalarWhereInput | TaskEscrowScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type AuthorizationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthorizationCreateWithoutUserInput, AuthorizationUncheckedCreateWithoutUserInput> | AuthorizationCreateWithoutUserInput[] | AuthorizationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthorizationCreateOrConnectWithoutUserInput | AuthorizationCreateOrConnectWithoutUserInput[]
    upsert?: AuthorizationUpsertWithWhereUniqueWithoutUserInput | AuthorizationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthorizationCreateManyUserInputEnvelope
    set?: AuthorizationWhereUniqueInput | AuthorizationWhereUniqueInput[]
    disconnect?: AuthorizationWhereUniqueInput | AuthorizationWhereUniqueInput[]
    delete?: AuthorizationWhereUniqueInput | AuthorizationWhereUniqueInput[]
    connect?: AuthorizationWhereUniqueInput | AuthorizationWhereUniqueInput[]
    update?: AuthorizationUpdateWithWhereUniqueWithoutUserInput | AuthorizationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthorizationUpdateManyWithWhereWithoutUserInput | AuthorizationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthorizationScalarWhereInput | AuthorizationScalarWhereInput[]
  }

  export type TaskEscrowUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskEscrowCreateWithoutUserInput, TaskEscrowUncheckedCreateWithoutUserInput> | TaskEscrowCreateWithoutUserInput[] | TaskEscrowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskEscrowCreateOrConnectWithoutUserInput | TaskEscrowCreateOrConnectWithoutUserInput[]
    upsert?: TaskEscrowUpsertWithWhereUniqueWithoutUserInput | TaskEscrowUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskEscrowCreateManyUserInputEnvelope
    set?: TaskEscrowWhereUniqueInput | TaskEscrowWhereUniqueInput[]
    disconnect?: TaskEscrowWhereUniqueInput | TaskEscrowWhereUniqueInput[]
    delete?: TaskEscrowWhereUniqueInput | TaskEscrowWhereUniqueInput[]
    connect?: TaskEscrowWhereUniqueInput | TaskEscrowWhereUniqueInput[]
    update?: TaskEscrowUpdateWithWhereUniqueWithoutUserInput | TaskEscrowUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskEscrowUpdateManyWithWhereWithoutUserInput | TaskEscrowUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskEscrowScalarWhereInput | TaskEscrowScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAuthorizationsInput = {
    create?: XOR<UserCreateWithoutAuthorizationsInput, UserUncheckedCreateWithoutAuthorizationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthorizationsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneWithoutAuthorizationsNestedInput = {
    create?: XOR<UserCreateWithoutAuthorizationsInput, UserUncheckedCreateWithoutAuthorizationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthorizationsInput
    upsert?: UserUpsertWithoutAuthorizationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuthorizationsInput, UserUpdateWithoutAuthorizationsInput>, UserUncheckedUpdateWithoutAuthorizationsInput>
  }

  export type UserCreateNestedOneWithoutTaskEscrowsInput = {
    create?: XOR<UserCreateWithoutTaskEscrowsInput, UserUncheckedCreateWithoutTaskEscrowsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskEscrowsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTaskEscrowStatusFieldUpdateOperationsInput = {
    set?: $Enums.TaskEscrowStatus
  }

  export type UserUpdateOneWithoutTaskEscrowsNestedInput = {
    create?: XOR<UserCreateWithoutTaskEscrowsInput, UserUncheckedCreateWithoutTaskEscrowsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskEscrowsInput
    upsert?: UserUpsertWithoutTaskEscrowsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTaskEscrowsInput, UserUpdateWithoutTaskEscrowsInput>, UserUncheckedUpdateWithoutTaskEscrowsInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumAuditLogStatusFieldUpdateOperationsInput = {
    set?: $Enums.AuditLogStatus
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumPersonalityFilter<$PrismaModel = never> = {
    equals?: $Enums.Personality | EnumPersonalityFieldRefInput<$PrismaModel>
    in?: $Enums.Personality[] | ListEnumPersonalityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Personality[] | ListEnumPersonalityFieldRefInput<$PrismaModel>
    not?: NestedEnumPersonalityFilter<$PrismaModel> | $Enums.Personality
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumPersonalityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Personality | EnumPersonalityFieldRefInput<$PrismaModel>
    in?: $Enums.Personality[] | ListEnumPersonalityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Personality[] | ListEnumPersonalityFieldRefInput<$PrismaModel>
    not?: NestedEnumPersonalityWithAggregatesFilter<$PrismaModel> | $Enums.Personality
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPersonalityFilter<$PrismaModel>
    _max?: NestedEnumPersonalityFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumTaskEscrowStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskEscrowStatus | EnumTaskEscrowStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskEscrowStatus[] | ListEnumTaskEscrowStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskEscrowStatus[] | ListEnumTaskEscrowStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskEscrowStatusFilter<$PrismaModel> | $Enums.TaskEscrowStatus
  }

  export type NestedEnumTaskEscrowStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskEscrowStatus | EnumTaskEscrowStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskEscrowStatus[] | ListEnumTaskEscrowStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskEscrowStatus[] | ListEnumTaskEscrowStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskEscrowStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskEscrowStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskEscrowStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskEscrowStatusFilter<$PrismaModel>
  }

  export type NestedEnumAuditLogStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditLogStatus | EnumAuditLogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AuditLogStatus[] | ListEnumAuditLogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditLogStatus[] | ListEnumAuditLogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditLogStatusFilter<$PrismaModel> | $Enums.AuditLogStatus
  }

  export type NestedEnumAuditLogStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditLogStatus | EnumAuditLogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AuditLogStatus[] | ListEnumAuditLogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditLogStatus[] | ListEnumAuditLogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditLogStatusWithAggregatesFilter<$PrismaModel> | $Enums.AuditLogStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditLogStatusFilter<$PrismaModel>
    _max?: NestedEnumAuditLogStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuthorizationCreateWithoutUserInput = {
    id?: string
    agentId: string
    signature: string
    maxSpend: string
    expiresAt: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthorizationUncheckedCreateWithoutUserInput = {
    id?: string
    agentId: string
    signature: string
    maxSpend: string
    expiresAt: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuthorizationCreateOrConnectWithoutUserInput = {
    where: AuthorizationWhereUniqueInput
    create: XOR<AuthorizationCreateWithoutUserInput, AuthorizationUncheckedCreateWithoutUserInput>
  }

  export type AuthorizationCreateManyUserInputEnvelope = {
    data: AuthorizationCreateManyUserInput | AuthorizationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskEscrowCreateWithoutUserInput = {
    taskId: string
    amount: string
    status: $Enums.TaskEscrowStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskEscrowUncheckedCreateWithoutUserInput = {
    taskId: string
    amount: string
    status: $Enums.TaskEscrowStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskEscrowCreateOrConnectWithoutUserInput = {
    where: TaskEscrowWhereUniqueInput
    create: XOR<TaskEscrowCreateWithoutUserInput, TaskEscrowUncheckedCreateWithoutUserInput>
  }

  export type TaskEscrowCreateManyUserInputEnvelope = {
    data: TaskEscrowCreateManyUserInput | TaskEscrowCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    txHash?: string | null
    nonce?: string | null
    status?: $Enums.AuditLogStatus
    gasUsed?: string | null
    timestamp?: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    txHash?: string | null
    nonce?: string | null
    status?: $Enums.AuditLogStatus
    gasUsed?: string | null
    timestamp?: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuthorizationUpsertWithWhereUniqueWithoutUserInput = {
    where: AuthorizationWhereUniqueInput
    update: XOR<AuthorizationUpdateWithoutUserInput, AuthorizationUncheckedUpdateWithoutUserInput>
    create: XOR<AuthorizationCreateWithoutUserInput, AuthorizationUncheckedCreateWithoutUserInput>
  }

  export type AuthorizationUpdateWithWhereUniqueWithoutUserInput = {
    where: AuthorizationWhereUniqueInput
    data: XOR<AuthorizationUpdateWithoutUserInput, AuthorizationUncheckedUpdateWithoutUserInput>
  }

  export type AuthorizationUpdateManyWithWhereWithoutUserInput = {
    where: AuthorizationScalarWhereInput
    data: XOR<AuthorizationUpdateManyMutationInput, AuthorizationUncheckedUpdateManyWithoutUserInput>
  }

  export type AuthorizationScalarWhereInput = {
    AND?: AuthorizationScalarWhereInput | AuthorizationScalarWhereInput[]
    OR?: AuthorizationScalarWhereInput[]
    NOT?: AuthorizationScalarWhereInput | AuthorizationScalarWhereInput[]
    id?: StringFilter<"Authorization"> | string
    userHashedId?: StringFilter<"Authorization"> | string
    agentId?: StringFilter<"Authorization"> | string
    signature?: StringFilter<"Authorization"> | string
    maxSpend?: StringFilter<"Authorization"> | string
    expiresAt?: IntFilter<"Authorization"> | number
    isActive?: BoolFilter<"Authorization"> | boolean
    createdAt?: DateTimeFilter<"Authorization"> | Date | string
    updatedAt?: DateTimeFilter<"Authorization"> | Date | string
  }

  export type TaskEscrowUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskEscrowWhereUniqueInput
    update: XOR<TaskEscrowUpdateWithoutUserInput, TaskEscrowUncheckedUpdateWithoutUserInput>
    create: XOR<TaskEscrowCreateWithoutUserInput, TaskEscrowUncheckedCreateWithoutUserInput>
  }

  export type TaskEscrowUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskEscrowWhereUniqueInput
    data: XOR<TaskEscrowUpdateWithoutUserInput, TaskEscrowUncheckedUpdateWithoutUserInput>
  }

  export type TaskEscrowUpdateManyWithWhereWithoutUserInput = {
    where: TaskEscrowScalarWhereInput
    data: XOR<TaskEscrowUpdateManyMutationInput, TaskEscrowUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskEscrowScalarWhereInput = {
    AND?: TaskEscrowScalarWhereInput | TaskEscrowScalarWhereInput[]
    OR?: TaskEscrowScalarWhereInput[]
    NOT?: TaskEscrowScalarWhereInput | TaskEscrowScalarWhereInput[]
    taskId?: StringFilter<"TaskEscrow"> | string
    userHashedId?: StringFilter<"TaskEscrow"> | string
    amount?: StringFilter<"TaskEscrow"> | string
    status?: EnumTaskEscrowStatusFilter<"TaskEscrow"> | $Enums.TaskEscrowStatus
    createdAt?: DateTimeFilter<"TaskEscrow"> | Date | string
    updatedAt?: DateTimeFilter<"TaskEscrow"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userHashedId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    txHash?: StringNullableFilter<"AuditLog"> | string | null
    nonce?: StringNullableFilter<"AuditLog"> | string | null
    status?: EnumAuditLogStatusFilter<"AuditLog"> | $Enums.AuditLogStatus
    gasUsed?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    details?: JsonNullableFilter<"AuditLog">
  }

  export type UserCreateWithoutAuthorizationsInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    personality: $Enums.Personality
    createdAt?: Date | string
    taskEscrows?: TaskEscrowCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuthorizationsInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    personality: $Enums.Personality
    createdAt?: Date | string
    taskEscrows?: TaskEscrowUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuthorizationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuthorizationsInput, UserUncheckedCreateWithoutAuthorizationsInput>
  }

  export type UserUpsertWithoutAuthorizationsInput = {
    update: XOR<UserUpdateWithoutAuthorizationsInput, UserUncheckedUpdateWithoutAuthorizationsInput>
    create: XOR<UserCreateWithoutAuthorizationsInput, UserUncheckedCreateWithoutAuthorizationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuthorizationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuthorizationsInput, UserUncheckedUpdateWithoutAuthorizationsInput>
  }

  export type UserUpdateWithoutAuthorizationsInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: EnumPersonalityFieldUpdateOperationsInput | $Enums.Personality
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskEscrows?: TaskEscrowUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuthorizationsInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: EnumPersonalityFieldUpdateOperationsInput | $Enums.Personality
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskEscrows?: TaskEscrowUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTaskEscrowsInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    personality: $Enums.Personality
    createdAt?: Date | string
    authorizations?: AuthorizationCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTaskEscrowsInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    personality: $Enums.Personality
    createdAt?: Date | string
    authorizations?: AuthorizationUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTaskEscrowsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTaskEscrowsInput, UserUncheckedCreateWithoutTaskEscrowsInput>
  }

  export type UserUpsertWithoutTaskEscrowsInput = {
    update: XOR<UserUpdateWithoutTaskEscrowsInput, UserUncheckedUpdateWithoutTaskEscrowsInput>
    create: XOR<UserCreateWithoutTaskEscrowsInput, UserUncheckedCreateWithoutTaskEscrowsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTaskEscrowsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTaskEscrowsInput, UserUncheckedUpdateWithoutTaskEscrowsInput>
  }

  export type UserUpdateWithoutTaskEscrowsInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: EnumPersonalityFieldUpdateOperationsInput | $Enums.Personality
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorizations?: AuthorizationUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTaskEscrowsInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: EnumPersonalityFieldUpdateOperationsInput | $Enums.Personality
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorizations?: AuthorizationUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    personality: $Enums.Personality
    createdAt?: Date | string
    authorizations?: AuthorizationCreateNestedManyWithoutUserInput
    taskEscrows?: TaskEscrowCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    personality: $Enums.Personality
    createdAt?: Date | string
    authorizations?: AuthorizationUncheckedCreateNestedManyWithoutUserInput
    taskEscrows?: TaskEscrowUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: EnumPersonalityFieldUpdateOperationsInput | $Enums.Personality
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorizations?: AuthorizationUpdateManyWithoutUserNestedInput
    taskEscrows?: TaskEscrowUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: EnumPersonalityFieldUpdateOperationsInput | $Enums.Personality
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorizations?: AuthorizationUncheckedUpdateManyWithoutUserNestedInput
    taskEscrows?: TaskEscrowUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AuthorizationCreateManyUserInput = {
    id?: string
    agentId: string
    signature: string
    maxSpend: string
    expiresAt: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskEscrowCreateManyUserInput = {
    taskId: string
    amount: string
    status: $Enums.TaskEscrowStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    txHash?: string | null
    nonce?: string | null
    status?: $Enums.AuditLogStatus
    gasUsed?: string | null
    timestamp?: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuthorizationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    signature?: StringFieldUpdateOperationsInput | string
    maxSpend?: StringFieldUpdateOperationsInput | string
    expiresAt?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthorizationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    signature?: StringFieldUpdateOperationsInput | string
    maxSpend?: StringFieldUpdateOperationsInput | string
    expiresAt?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthorizationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    signature?: StringFieldUpdateOperationsInput | string
    maxSpend?: StringFieldUpdateOperationsInput | string
    expiresAt?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskEscrowUpdateWithoutUserInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskEscrowStatusFieldUpdateOperationsInput | $Enums.TaskEscrowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskEscrowUncheckedUpdateWithoutUserInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskEscrowStatusFieldUpdateOperationsInput | $Enums.TaskEscrowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskEscrowUncheckedUpdateManyWithoutUserInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskEscrowStatusFieldUpdateOperationsInput | $Enums.TaskEscrowStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAuditLogStatusFieldUpdateOperationsInput | $Enums.AuditLogStatus
    gasUsed?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAuditLogStatusFieldUpdateOperationsInput | $Enums.AuditLogStatus
    gasUsed?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAuditLogStatusFieldUpdateOperationsInput | $Enums.AuditLogStatus
    gasUsed?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}