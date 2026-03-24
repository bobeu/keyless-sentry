
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
 * Model Wallet
 * 
 */
export type Wallet = $Result.DefaultSelection<Prisma.$WalletPayload>
/**
 * Model Signature
 * 
 */
export type Signature = $Result.DefaultSelection<Prisma.$SignaturePayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model Bounty
 * 
 */
export type Bounty = $Result.DefaultSelection<Prisma.$BountyPayload>
/**
 * Model Registration
 * 
 */
export type Registration = $Result.DefaultSelection<Prisma.$RegistrationPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model BountyClawIdentity
 * *
 *  * BountyClaw Identity - Stores the agent's identity
 *  * This is a singleton record for the BountyClaw agent itself
 */
export type BountyClawIdentity = $Result.DefaultSelection<Prisma.$BountyClawIdentityPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const BountyStatus: {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  ESCROWED: 'ESCROWED',
  PENDING_VERIFICATION: 'PENDING_VERIFICATION',
  RELEASED: 'RELEASED',
  CANCELLED: 'CANCELLED'
};

export type BountyStatus = (typeof BountyStatus)[keyof typeof BountyStatus]


export const RegistrationStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED'
};

export type RegistrationStatus = (typeof RegistrationStatus)[keyof typeof RegistrationStatus]


export const AuditLogStatus: {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

export type AuditLogStatus = (typeof AuditLogStatus)[keyof typeof AuditLogStatus]


export const WalletType: {
  USER: 'USER',
  BOUNTY: 'BOUNTY',
  AGENT: 'AGENT'
};

export type WalletType = (typeof WalletType)[keyof typeof WalletType]

}

export type BountyStatus = $Enums.BountyStatus

export const BountyStatus: typeof $Enums.BountyStatus

export type RegistrationStatus = $Enums.RegistrationStatus

export const RegistrationStatus: typeof $Enums.RegistrationStatus

export type AuditLogStatus = $Enums.AuditLogStatus

export const AuditLogStatus: typeof $Enums.AuditLogStatus

export type WalletType = $Enums.WalletType

export const WalletType: typeof $Enums.WalletType

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
   * `prisma.wallet`: Exposes CRUD operations for the **Wallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallet.findMany()
    * ```
    */
  get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.signature`: Exposes CRUD operations for the **Signature** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Signatures
    * const signatures = await prisma.signature.findMany()
    * ```
    */
  get signature(): Prisma.SignatureDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bounty`: Exposes CRUD operations for the **Bounty** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bounties
    * const bounties = await prisma.bounty.findMany()
    * ```
    */
  get bounty(): Prisma.BountyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.registration`: Exposes CRUD operations for the **Registration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Registrations
    * const registrations = await prisma.registration.findMany()
    * ```
    */
  get registration(): Prisma.RegistrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bountyClawIdentity`: Exposes CRUD operations for the **BountyClawIdentity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BountyClawIdentities
    * const bountyClawIdentities = await prisma.bountyClawIdentity.findMany()
    * ```
    */
  get bountyClawIdentity(): Prisma.BountyClawIdentityDelegate<ExtArgs, ClientOptions>;
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
    Wallet: 'Wallet',
    Signature: 'Signature',
    Transaction: 'Transaction',
    Bounty: 'Bounty',
    Registration: 'Registration',
    AuditLog: 'AuditLog',
    BountyClawIdentity: 'BountyClawIdentity'
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
      modelProps: "user" | "wallet" | "signature" | "transaction" | "bounty" | "registration" | "auditLog" | "bountyClawIdentity"
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
      Wallet: {
        payload: Prisma.$WalletPayload<ExtArgs>
        fields: Prisma.WalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findFirst: {
            args: Prisma.WalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findMany: {
            args: Prisma.WalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          create: {
            args: Prisma.WalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          createMany: {
            args: Prisma.WalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          delete: {
            args: Prisma.WalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          update: {
            args: Prisma.WalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          deleteMany: {
            args: Prisma.WalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WalletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          upsert: {
            args: Prisma.WalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          aggregate: {
            args: Prisma.WalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallet>
          }
          groupBy: {
            args: Prisma.WalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletCountArgs<ExtArgs>
            result: $Utils.Optional<WalletCountAggregateOutputType> | number
          }
        }
      }
      Signature: {
        payload: Prisma.$SignaturePayload<ExtArgs>
        fields: Prisma.SignatureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SignatureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SignatureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          findFirst: {
            args: Prisma.SignatureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SignatureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          findMany: {
            args: Prisma.SignatureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>[]
          }
          create: {
            args: Prisma.SignatureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          createMany: {
            args: Prisma.SignatureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SignatureCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>[]
          }
          delete: {
            args: Prisma.SignatureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          update: {
            args: Prisma.SignatureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          deleteMany: {
            args: Prisma.SignatureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SignatureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SignatureUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>[]
          }
          upsert: {
            args: Prisma.SignatureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          aggregate: {
            args: Prisma.SignatureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSignature>
          }
          groupBy: {
            args: Prisma.SignatureGroupByArgs<ExtArgs>
            result: $Utils.Optional<SignatureGroupByOutputType>[]
          }
          count: {
            args: Prisma.SignatureCountArgs<ExtArgs>
            result: $Utils.Optional<SignatureCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      Bounty: {
        payload: Prisma.$BountyPayload<ExtArgs>
        fields: Prisma.BountyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BountyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BountyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>
          }
          findFirst: {
            args: Prisma.BountyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BountyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>
          }
          findMany: {
            args: Prisma.BountyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>[]
          }
          create: {
            args: Prisma.BountyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>
          }
          createMany: {
            args: Prisma.BountyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BountyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>[]
          }
          delete: {
            args: Prisma.BountyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>
          }
          update: {
            args: Prisma.BountyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>
          }
          deleteMany: {
            args: Prisma.BountyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BountyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BountyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>[]
          }
          upsert: {
            args: Prisma.BountyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>
          }
          aggregate: {
            args: Prisma.BountyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBounty>
          }
          groupBy: {
            args: Prisma.BountyGroupByArgs<ExtArgs>
            result: $Utils.Optional<BountyGroupByOutputType>[]
          }
          count: {
            args: Prisma.BountyCountArgs<ExtArgs>
            result: $Utils.Optional<BountyCountAggregateOutputType> | number
          }
        }
      }
      Registration: {
        payload: Prisma.$RegistrationPayload<ExtArgs>
        fields: Prisma.RegistrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegistrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegistrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          findFirst: {
            args: Prisma.RegistrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegistrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          findMany: {
            args: Prisma.RegistrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>[]
          }
          create: {
            args: Prisma.RegistrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          createMany: {
            args: Prisma.RegistrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegistrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>[]
          }
          delete: {
            args: Prisma.RegistrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          update: {
            args: Prisma.RegistrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          deleteMany: {
            args: Prisma.RegistrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegistrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegistrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>[]
          }
          upsert: {
            args: Prisma.RegistrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          aggregate: {
            args: Prisma.RegistrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegistration>
          }
          groupBy: {
            args: Prisma.RegistrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegistrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegistrationCountArgs<ExtArgs>
            result: $Utils.Optional<RegistrationCountAggregateOutputType> | number
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
      BountyClawIdentity: {
        payload: Prisma.$BountyClawIdentityPayload<ExtArgs>
        fields: Prisma.BountyClawIdentityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BountyClawIdentityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyClawIdentityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BountyClawIdentityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyClawIdentityPayload>
          }
          findFirst: {
            args: Prisma.BountyClawIdentityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyClawIdentityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BountyClawIdentityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyClawIdentityPayload>
          }
          findMany: {
            args: Prisma.BountyClawIdentityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyClawIdentityPayload>[]
          }
          create: {
            args: Prisma.BountyClawIdentityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyClawIdentityPayload>
          }
          createMany: {
            args: Prisma.BountyClawIdentityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BountyClawIdentityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyClawIdentityPayload>[]
          }
          delete: {
            args: Prisma.BountyClawIdentityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyClawIdentityPayload>
          }
          update: {
            args: Prisma.BountyClawIdentityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyClawIdentityPayload>
          }
          deleteMany: {
            args: Prisma.BountyClawIdentityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BountyClawIdentityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BountyClawIdentityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyClawIdentityPayload>[]
          }
          upsert: {
            args: Prisma.BountyClawIdentityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BountyClawIdentityPayload>
          }
          aggregate: {
            args: Prisma.BountyClawIdentityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBountyClawIdentity>
          }
          groupBy: {
            args: Prisma.BountyClawIdentityGroupByArgs<ExtArgs>
            result: $Utils.Optional<BountyClawIdentityGroupByOutputType>[]
          }
          count: {
            args: Prisma.BountyClawIdentityCountArgs<ExtArgs>
            result: $Utils.Optional<BountyClawIdentityCountAggregateOutputType> | number
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
    wallet?: WalletOmit
    signature?: SignatureOmit
    transaction?: TransactionOmit
    bounty?: BountyOmit
    registration?: RegistrationOmit
    auditLog?: AuditLogOmit
    bountyClawIdentity?: BountyClawIdentityOmit
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
    bounties: number
    auditLogs: number
    wallets: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bounties?: boolean | UserCountOutputTypeCountBountiesArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
    wallets?: boolean | UserCountOutputTypeCountWalletsArgs
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
  export type UserCountOutputTypeCountBountiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BountyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWalletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
  }


  /**
   * Count Type WalletCountOutputType
   */

  export type WalletCountOutputType = {
    bounties: number
  }

  export type WalletCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bounties?: boolean | WalletCountOutputTypeCountBountiesArgs
  }

  // Custom InputTypes
  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletCountOutputType
     */
    select?: WalletCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeCountBountiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BountyWhereInput
  }


  /**
   * Count Type BountyCountOutputType
   */

  export type BountyCountOutputType = {
    registrations: number
  }

  export type BountyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registrations?: boolean | BountyCountOutputTypeCountRegistrationsArgs
  }

  // Custom InputTypes
  /**
   * BountyCountOutputType without action
   */
  export type BountyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BountyCountOutputType
     */
    select?: BountyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BountyCountOutputType without action
   */
  export type BountyCountOutputTypeCountRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrationWhereInput
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
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    hashedId: string | null
    eoaAddress: string | null
    walletAddress: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    hashedId: number
    eoaAddress: number
    walletAddress: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    hashedId?: true
    eoaAddress?: true
    walletAddress?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    hashedId?: true
    eoaAddress?: true
    walletAddress?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    hashedId?: true
    eoaAddress?: true
    walletAddress?: true
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
    createdAt?: boolean
    bounties?: boolean | User$bountiesArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    wallets?: boolean | User$walletsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    hashedId?: boolean
    eoaAddress?: boolean
    walletAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    hashedId?: boolean
    eoaAddress?: boolean
    walletAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    hashedId?: boolean
    eoaAddress?: boolean
    walletAddress?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"hashedId" | "eoaAddress" | "walletAddress" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bounties?: boolean | User$bountiesArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    wallets?: boolean | User$walletsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      bounties: Prisma.$BountyPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
      wallets: Prisma.$WalletPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      hashedId: string
      eoaAddress: string
      walletAddress: string | null
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
    bounties<T extends User$bountiesArgs<ExtArgs> = {}>(args?: Subset<T, User$bountiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wallets<T extends User$walletsArgs<ExtArgs> = {}>(args?: Subset<T, User$walletsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * User.bounties
   */
  export type User$bountiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bounty
     */
    omit?: BountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BountyInclude<ExtArgs> | null
    where?: BountyWhereInput
    orderBy?: BountyOrderByWithRelationInput | BountyOrderByWithRelationInput[]
    cursor?: BountyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BountyScalarFieldEnum | BountyScalarFieldEnum[]
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
   * User.wallets
   */
  export type User$walletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    cursor?: WalletWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
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
   * Model Wallet
   */

  export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  export type WalletMinAggregateOutputType = {
    id: string | null
    userId: string | null
    address: string | null
    walletType: $Enums.WalletType | null
    bountyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WalletMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    address: string | null
    walletType: $Enums.WalletType | null
    bountyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WalletCountAggregateOutputType = {
    id: number
    userId: number
    address: number
    walletType: number
    bountyId: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WalletMinAggregateInputType = {
    id?: true
    userId?: true
    address?: true
    walletType?: true
    bountyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WalletMaxAggregateInputType = {
    id?: true
    userId?: true
    address?: true
    walletType?: true
    bountyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WalletCountAggregateInputType = {
    id?: true
    userId?: true
    address?: true
    walletType?: true
    bountyId?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallet to aggregate.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wallets
    **/
    _count?: true | WalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletMaxAggregateInputType
  }

  export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
        [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallet[P]>
      : GetScalarType<T[P], AggregateWallet[P]>
  }




  export type WalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithAggregationInput | WalletOrderByWithAggregationInput[]
    by: WalletScalarFieldEnum[] | WalletScalarFieldEnum
    having?: WalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletCountAggregateInputType | true
    _min?: WalletMinAggregateInputType
    _max?: WalletMaxAggregateInputType
  }

  export type WalletGroupByOutputType = {
    id: string
    userId: string | null
    address: string
    walletType: $Enums.WalletType
    bountyId: string | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  type GetWalletGroupByPayload<T extends WalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletGroupByOutputType[P]>
            : GetScalarType<T[P], WalletGroupByOutputType[P]>
        }
      >
    >


  export type WalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    address?: boolean
    walletType?: boolean
    bountyId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Wallet$userArgs<ExtArgs>
    bounties?: boolean | Wallet$bountiesArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    address?: boolean
    walletType?: boolean
    bountyId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Wallet$userArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    address?: boolean
    walletType?: boolean
    bountyId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Wallet$userArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectScalar = {
    id?: boolean
    userId?: boolean
    address?: boolean
    walletType?: boolean
    bountyId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "address" | "walletType" | "bountyId" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["wallet"]>
  export type WalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Wallet$userArgs<ExtArgs>
    bounties?: boolean | Wallet$bountiesArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WalletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Wallet$userArgs<ExtArgs>
  }
  export type WalletIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Wallet$userArgs<ExtArgs>
  }

  export type $WalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wallet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      bounties: Prisma.$BountyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      address: string
      walletType: $Enums.WalletType
      bountyId: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wallet"]>
    composites: {}
  }

  type WalletGetPayload<S extends boolean | null | undefined | WalletDefaultArgs> = $Result.GetResult<Prisma.$WalletPayload, S>

  type WalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletCountAggregateInputType | true
    }

  export interface WalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wallet'], meta: { name: 'Wallet' } }
    /**
     * Find zero or one Wallet that matches the filter.
     * @param {WalletFindUniqueArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletFindUniqueArgs>(args: SelectSubset<T, WalletFindUniqueArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletFindUniqueOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletFindFirstArgs>(args?: SelectSubset<T, WalletFindFirstArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallets
     * const wallets = await prisma.wallet.findMany()
     * 
     * // Get first 10 Wallets
     * const wallets = await prisma.wallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletWithIdOnly = await prisma.wallet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WalletFindManyArgs>(args?: SelectSubset<T, WalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wallet.
     * @param {WalletCreateArgs} args - Arguments to create a Wallet.
     * @example
     * // Create one Wallet
     * const Wallet = await prisma.wallet.create({
     *   data: {
     *     // ... data to create a Wallet
     *   }
     * })
     * 
     */
    create<T extends WalletCreateArgs>(args: SelectSubset<T, WalletCreateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wallets.
     * @param {WalletCreateManyArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletCreateManyArgs>(args?: SelectSubset<T, WalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wallets and returns the data saved in the database.
     * @param {WalletCreateManyAndReturnArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wallet.
     * @param {WalletDeleteArgs} args - Arguments to delete one Wallet.
     * @example
     * // Delete one Wallet
     * const Wallet = await prisma.wallet.delete({
     *   where: {
     *     // ... filter to delete one Wallet
     *   }
     * })
     * 
     */
    delete<T extends WalletDeleteArgs>(args: SelectSubset<T, WalletDeleteArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wallet.
     * @param {WalletUpdateArgs} args - Arguments to update one Wallet.
     * @example
     * // Update one Wallet
     * const wallet = await prisma.wallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletUpdateArgs>(args: SelectSubset<T, WalletUpdateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wallets.
     * @param {WalletDeleteManyArgs} args - Arguments to filter Wallets to delete.
     * @example
     * // Delete a few Wallets
     * const { count } = await prisma.wallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletDeleteManyArgs>(args?: SelectSubset<T, WalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletUpdateManyArgs>(args: SelectSubset<T, WalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets and returns the data updated in the database.
     * @param {WalletUpdateManyAndReturnArgs} args - Arguments to update many Wallets.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.updateManyAndReturn({
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
    updateManyAndReturn<T extends WalletUpdateManyAndReturnArgs>(args: SelectSubset<T, WalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wallet.
     * @param {WalletUpsertArgs} args - Arguments to update or create a Wallet.
     * @example
     * // Update or create a Wallet
     * const wallet = await prisma.wallet.upsert({
     *   create: {
     *     // ... data to create a Wallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallet we want to update
     *   }
     * })
     */
    upsert<T extends WalletUpsertArgs>(args: SelectSubset<T, WalletUpsertArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletCountArgs} args - Arguments to filter Wallets to count.
     * @example
     * // Count the number of Wallets
     * const count = await prisma.wallet.count({
     *   where: {
     *     // ... the filter for the Wallets we want to count
     *   }
     * })
    **/
    count<T extends WalletCountArgs>(
      args?: Subset<T, WalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WalletAggregateArgs>(args: Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>

    /**
     * Group by Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletGroupByArgs} args - Group by arguments.
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
      T extends WalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletGroupByArgs['orderBy'] }
        : { orderBy?: WalletGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wallet model
   */
  readonly fields: WalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Wallet$userArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    bounties<T extends Wallet$bountiesArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$bountiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Wallet model
   */
  interface WalletFieldRefs {
    readonly id: FieldRef<"Wallet", 'String'>
    readonly userId: FieldRef<"Wallet", 'String'>
    readonly address: FieldRef<"Wallet", 'String'>
    readonly walletType: FieldRef<"Wallet", 'WalletType'>
    readonly bountyId: FieldRef<"Wallet", 'String'>
    readonly metadata: FieldRef<"Wallet", 'Json'>
    readonly createdAt: FieldRef<"Wallet", 'DateTime'>
    readonly updatedAt: FieldRef<"Wallet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Wallet findUnique
   */
  export type WalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findUniqueOrThrow
   */
  export type WalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findFirst
   */
  export type WalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findFirstOrThrow
   */
  export type WalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findMany
   */
  export type WalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallets to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet create
   */
  export type WalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to create a Wallet.
     */
    data: XOR<WalletCreateInput, WalletUncheckedCreateInput>
  }

  /**
   * Wallet createMany
   */
  export type WalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wallet createManyAndReturn
   */
  export type WalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet update
   */
  export type WalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to update a Wallet.
     */
    data: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
    /**
     * Choose, which Wallet to update.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet updateMany
   */
  export type WalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
  }

  /**
   * Wallet updateManyAndReturn
   */
  export type WalletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet upsert
   */
  export type WalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The filter to search for the Wallet to update in case it exists.
     */
    where: WalletWhereUniqueInput
    /**
     * In case the Wallet found by the `where` argument doesn't exist, create a new Wallet with this data.
     */
    create: XOR<WalletCreateInput, WalletUncheckedCreateInput>
    /**
     * In case the Wallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
  }

  /**
   * Wallet delete
   */
  export type WalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter which Wallet to delete.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet deleteMany
   */
  export type WalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallets to delete
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to delete.
     */
    limit?: number
  }

  /**
   * Wallet.user
   */
  export type Wallet$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Wallet.bounties
   */
  export type Wallet$bountiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bounty
     */
    omit?: BountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BountyInclude<ExtArgs> | null
    where?: BountyWhereInput
    orderBy?: BountyOrderByWithRelationInput | BountyOrderByWithRelationInput[]
    cursor?: BountyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BountyScalarFieldEnum | BountyScalarFieldEnum[]
  }

  /**
   * Wallet without action
   */
  export type WalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
  }


  /**
   * Model Signature
   */

  export type AggregateSignature = {
    _count: SignatureCountAggregateOutputType | null
    _min: SignatureMinAggregateOutputType | null
    _max: SignatureMaxAggregateOutputType | null
  }

  export type SignatureMinAggregateOutputType = {
    id: string | null
    walletAddress: string | null
    authorization: string | null
    signedMessage: string | null
    expiresAt: Date | null
    createdAt: Date | null
    isActive: boolean | null
  }

  export type SignatureMaxAggregateOutputType = {
    id: string | null
    walletAddress: string | null
    authorization: string | null
    signedMessage: string | null
    expiresAt: Date | null
    createdAt: Date | null
    isActive: boolean | null
  }

  export type SignatureCountAggregateOutputType = {
    id: number
    walletAddress: number
    authorization: number
    signedMessage: number
    expiresAt: number
    createdAt: number
    isActive: number
    _all: number
  }


  export type SignatureMinAggregateInputType = {
    id?: true
    walletAddress?: true
    authorization?: true
    signedMessage?: true
    expiresAt?: true
    createdAt?: true
    isActive?: true
  }

  export type SignatureMaxAggregateInputType = {
    id?: true
    walletAddress?: true
    authorization?: true
    signedMessage?: true
    expiresAt?: true
    createdAt?: true
    isActive?: true
  }

  export type SignatureCountAggregateInputType = {
    id?: true
    walletAddress?: true
    authorization?: true
    signedMessage?: true
    expiresAt?: true
    createdAt?: true
    isActive?: true
    _all?: true
  }

  export type SignatureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Signature to aggregate.
     */
    where?: SignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signatures to fetch.
     */
    orderBy?: SignatureOrderByWithRelationInput | SignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Signatures
    **/
    _count?: true | SignatureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SignatureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SignatureMaxAggregateInputType
  }

  export type GetSignatureAggregateType<T extends SignatureAggregateArgs> = {
        [P in keyof T & keyof AggregateSignature]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSignature[P]>
      : GetScalarType<T[P], AggregateSignature[P]>
  }




  export type SignatureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignatureWhereInput
    orderBy?: SignatureOrderByWithAggregationInput | SignatureOrderByWithAggregationInput[]
    by: SignatureScalarFieldEnum[] | SignatureScalarFieldEnum
    having?: SignatureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SignatureCountAggregateInputType | true
    _min?: SignatureMinAggregateInputType
    _max?: SignatureMaxAggregateInputType
  }

  export type SignatureGroupByOutputType = {
    id: string
    walletAddress: string
    authorization: string
    signedMessage: string
    expiresAt: Date | null
    createdAt: Date
    isActive: boolean
    _count: SignatureCountAggregateOutputType | null
    _min: SignatureMinAggregateOutputType | null
    _max: SignatureMaxAggregateOutputType | null
  }

  type GetSignatureGroupByPayload<T extends SignatureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SignatureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SignatureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SignatureGroupByOutputType[P]>
            : GetScalarType<T[P], SignatureGroupByOutputType[P]>
        }
      >
    >


  export type SignatureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    authorization?: boolean
    signedMessage?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["signature"]>

  export type SignatureSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    authorization?: boolean
    signedMessage?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["signature"]>

  export type SignatureSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    authorization?: boolean
    signedMessage?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["signature"]>

  export type SignatureSelectScalar = {
    id?: boolean
    walletAddress?: boolean
    authorization?: boolean
    signedMessage?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    isActive?: boolean
  }

  export type SignatureOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletAddress" | "authorization" | "signedMessage" | "expiresAt" | "createdAt" | "isActive", ExtArgs["result"]["signature"]>

  export type $SignaturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Signature"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      walletAddress: string
      authorization: string
      signedMessage: string
      expiresAt: Date | null
      createdAt: Date
      isActive: boolean
    }, ExtArgs["result"]["signature"]>
    composites: {}
  }

  type SignatureGetPayload<S extends boolean | null | undefined | SignatureDefaultArgs> = $Result.GetResult<Prisma.$SignaturePayload, S>

  type SignatureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SignatureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SignatureCountAggregateInputType | true
    }

  export interface SignatureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Signature'], meta: { name: 'Signature' } }
    /**
     * Find zero or one Signature that matches the filter.
     * @param {SignatureFindUniqueArgs} args - Arguments to find a Signature
     * @example
     * // Get one Signature
     * const signature = await prisma.signature.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SignatureFindUniqueArgs>(args: SelectSubset<T, SignatureFindUniqueArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Signature that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SignatureFindUniqueOrThrowArgs} args - Arguments to find a Signature
     * @example
     * // Get one Signature
     * const signature = await prisma.signature.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SignatureFindUniqueOrThrowArgs>(args: SelectSubset<T, SignatureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Signature that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureFindFirstArgs} args - Arguments to find a Signature
     * @example
     * // Get one Signature
     * const signature = await prisma.signature.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SignatureFindFirstArgs>(args?: SelectSubset<T, SignatureFindFirstArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Signature that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureFindFirstOrThrowArgs} args - Arguments to find a Signature
     * @example
     * // Get one Signature
     * const signature = await prisma.signature.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SignatureFindFirstOrThrowArgs>(args?: SelectSubset<T, SignatureFindFirstOrThrowArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Signatures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Signatures
     * const signatures = await prisma.signature.findMany()
     * 
     * // Get first 10 Signatures
     * const signatures = await prisma.signature.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const signatureWithIdOnly = await prisma.signature.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SignatureFindManyArgs>(args?: SelectSubset<T, SignatureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Signature.
     * @param {SignatureCreateArgs} args - Arguments to create a Signature.
     * @example
     * // Create one Signature
     * const Signature = await prisma.signature.create({
     *   data: {
     *     // ... data to create a Signature
     *   }
     * })
     * 
     */
    create<T extends SignatureCreateArgs>(args: SelectSubset<T, SignatureCreateArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Signatures.
     * @param {SignatureCreateManyArgs} args - Arguments to create many Signatures.
     * @example
     * // Create many Signatures
     * const signature = await prisma.signature.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SignatureCreateManyArgs>(args?: SelectSubset<T, SignatureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Signatures and returns the data saved in the database.
     * @param {SignatureCreateManyAndReturnArgs} args - Arguments to create many Signatures.
     * @example
     * // Create many Signatures
     * const signature = await prisma.signature.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Signatures and only return the `id`
     * const signatureWithIdOnly = await prisma.signature.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SignatureCreateManyAndReturnArgs>(args?: SelectSubset<T, SignatureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Signature.
     * @param {SignatureDeleteArgs} args - Arguments to delete one Signature.
     * @example
     * // Delete one Signature
     * const Signature = await prisma.signature.delete({
     *   where: {
     *     // ... filter to delete one Signature
     *   }
     * })
     * 
     */
    delete<T extends SignatureDeleteArgs>(args: SelectSubset<T, SignatureDeleteArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Signature.
     * @param {SignatureUpdateArgs} args - Arguments to update one Signature.
     * @example
     * // Update one Signature
     * const signature = await prisma.signature.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SignatureUpdateArgs>(args: SelectSubset<T, SignatureUpdateArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Signatures.
     * @param {SignatureDeleteManyArgs} args - Arguments to filter Signatures to delete.
     * @example
     * // Delete a few Signatures
     * const { count } = await prisma.signature.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SignatureDeleteManyArgs>(args?: SelectSubset<T, SignatureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Signatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Signatures
     * const signature = await prisma.signature.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SignatureUpdateManyArgs>(args: SelectSubset<T, SignatureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Signatures and returns the data updated in the database.
     * @param {SignatureUpdateManyAndReturnArgs} args - Arguments to update many Signatures.
     * @example
     * // Update many Signatures
     * const signature = await prisma.signature.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Signatures and only return the `id`
     * const signatureWithIdOnly = await prisma.signature.updateManyAndReturn({
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
    updateManyAndReturn<T extends SignatureUpdateManyAndReturnArgs>(args: SelectSubset<T, SignatureUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Signature.
     * @param {SignatureUpsertArgs} args - Arguments to update or create a Signature.
     * @example
     * // Update or create a Signature
     * const signature = await prisma.signature.upsert({
     *   create: {
     *     // ... data to create a Signature
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Signature we want to update
     *   }
     * })
     */
    upsert<T extends SignatureUpsertArgs>(args: SelectSubset<T, SignatureUpsertArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Signatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureCountArgs} args - Arguments to filter Signatures to count.
     * @example
     * // Count the number of Signatures
     * const count = await prisma.signature.count({
     *   where: {
     *     // ... the filter for the Signatures we want to count
     *   }
     * })
    **/
    count<T extends SignatureCountArgs>(
      args?: Subset<T, SignatureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SignatureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Signature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SignatureAggregateArgs>(args: Subset<T, SignatureAggregateArgs>): Prisma.PrismaPromise<GetSignatureAggregateType<T>>

    /**
     * Group by Signature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureGroupByArgs} args - Group by arguments.
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
      T extends SignatureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SignatureGroupByArgs['orderBy'] }
        : { orderBy?: SignatureGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SignatureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSignatureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Signature model
   */
  readonly fields: SignatureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Signature.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SignatureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Signature model
   */
  interface SignatureFieldRefs {
    readonly id: FieldRef<"Signature", 'String'>
    readonly walletAddress: FieldRef<"Signature", 'String'>
    readonly authorization: FieldRef<"Signature", 'String'>
    readonly signedMessage: FieldRef<"Signature", 'String'>
    readonly expiresAt: FieldRef<"Signature", 'DateTime'>
    readonly createdAt: FieldRef<"Signature", 'DateTime'>
    readonly isActive: FieldRef<"Signature", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Signature findUnique
   */
  export type SignatureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Filter, which Signature to fetch.
     */
    where: SignatureWhereUniqueInput
  }

  /**
   * Signature findUniqueOrThrow
   */
  export type SignatureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Filter, which Signature to fetch.
     */
    where: SignatureWhereUniqueInput
  }

  /**
   * Signature findFirst
   */
  export type SignatureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Filter, which Signature to fetch.
     */
    where?: SignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signatures to fetch.
     */
    orderBy?: SignatureOrderByWithRelationInput | SignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Signatures.
     */
    cursor?: SignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Signatures.
     */
    distinct?: SignatureScalarFieldEnum | SignatureScalarFieldEnum[]
  }

  /**
   * Signature findFirstOrThrow
   */
  export type SignatureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Filter, which Signature to fetch.
     */
    where?: SignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signatures to fetch.
     */
    orderBy?: SignatureOrderByWithRelationInput | SignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Signatures.
     */
    cursor?: SignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Signatures.
     */
    distinct?: SignatureScalarFieldEnum | SignatureScalarFieldEnum[]
  }

  /**
   * Signature findMany
   */
  export type SignatureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Filter, which Signatures to fetch.
     */
    where?: SignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signatures to fetch.
     */
    orderBy?: SignatureOrderByWithRelationInput | SignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Signatures.
     */
    cursor?: SignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Signatures.
     */
    distinct?: SignatureScalarFieldEnum | SignatureScalarFieldEnum[]
  }

  /**
   * Signature create
   */
  export type SignatureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * The data needed to create a Signature.
     */
    data: XOR<SignatureCreateInput, SignatureUncheckedCreateInput>
  }

  /**
   * Signature createMany
   */
  export type SignatureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Signatures.
     */
    data: SignatureCreateManyInput | SignatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Signature createManyAndReturn
   */
  export type SignatureCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * The data used to create many Signatures.
     */
    data: SignatureCreateManyInput | SignatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Signature update
   */
  export type SignatureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * The data needed to update a Signature.
     */
    data: XOR<SignatureUpdateInput, SignatureUncheckedUpdateInput>
    /**
     * Choose, which Signature to update.
     */
    where: SignatureWhereUniqueInput
  }

  /**
   * Signature updateMany
   */
  export type SignatureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Signatures.
     */
    data: XOR<SignatureUpdateManyMutationInput, SignatureUncheckedUpdateManyInput>
    /**
     * Filter which Signatures to update
     */
    where?: SignatureWhereInput
    /**
     * Limit how many Signatures to update.
     */
    limit?: number
  }

  /**
   * Signature updateManyAndReturn
   */
  export type SignatureUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * The data used to update Signatures.
     */
    data: XOR<SignatureUpdateManyMutationInput, SignatureUncheckedUpdateManyInput>
    /**
     * Filter which Signatures to update
     */
    where?: SignatureWhereInput
    /**
     * Limit how many Signatures to update.
     */
    limit?: number
  }

  /**
   * Signature upsert
   */
  export type SignatureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * The filter to search for the Signature to update in case it exists.
     */
    where: SignatureWhereUniqueInput
    /**
     * In case the Signature found by the `where` argument doesn't exist, create a new Signature with this data.
     */
    create: XOR<SignatureCreateInput, SignatureUncheckedCreateInput>
    /**
     * In case the Signature was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SignatureUpdateInput, SignatureUncheckedUpdateInput>
  }

  /**
   * Signature delete
   */
  export type SignatureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Filter which Signature to delete.
     */
    where: SignatureWhereUniqueInput
  }

  /**
   * Signature deleteMany
   */
  export type SignatureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Signatures to delete
     */
    where?: SignatureWhereInput
    /**
     * Limit how many Signatures to delete.
     */
    limit?: number
  }

  /**
   * Signature without action
   */
  export type SignatureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    bountyId: string | null
    fromAddress: string | null
    toAddress: string | null
    amount: string | null
    currency: string | null
    txHash: string | null
    status: string | null
    type: string | null
    errorMessage: string | null
    createdAt: Date | null
    confirmedAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    bountyId: string | null
    fromAddress: string | null
    toAddress: string | null
    amount: string | null
    currency: string | null
    txHash: string | null
    status: string | null
    type: string | null
    errorMessage: string | null
    createdAt: Date | null
    confirmedAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    bountyId: number
    fromAddress: number
    toAddress: number
    amount: number
    currency: number
    txHash: number
    status: number
    type: number
    errorMessage: number
    createdAt: number
    confirmedAt: number
    _all: number
  }


  export type TransactionMinAggregateInputType = {
    id?: true
    bountyId?: true
    fromAddress?: true
    toAddress?: true
    amount?: true
    currency?: true
    txHash?: true
    status?: true
    type?: true
    errorMessage?: true
    createdAt?: true
    confirmedAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    bountyId?: true
    fromAddress?: true
    toAddress?: true
    amount?: true
    currency?: true
    txHash?: true
    status?: true
    type?: true
    errorMessage?: true
    createdAt?: true
    confirmedAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    bountyId?: true
    fromAddress?: true
    toAddress?: true
    amount?: true
    currency?: true
    txHash?: true
    status?: true
    type?: true
    errorMessage?: true
    createdAt?: true
    confirmedAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    bountyId: string | null
    fromAddress: string
    toAddress: string
    amount: string
    currency: string
    txHash: string | null
    status: string
    type: string
    errorMessage: string | null
    createdAt: Date
    confirmedAt: Date | null
    _count: TransactionCountAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bountyId?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    amount?: boolean
    currency?: boolean
    txHash?: boolean
    status?: boolean
    type?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    confirmedAt?: boolean
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bountyId?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    amount?: boolean
    currency?: boolean
    txHash?: boolean
    status?: boolean
    type?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    confirmedAt?: boolean
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bountyId?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    amount?: boolean
    currency?: boolean
    txHash?: boolean
    status?: boolean
    type?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    confirmedAt?: boolean
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    bountyId?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    amount?: boolean
    currency?: boolean
    txHash?: boolean
    status?: boolean
    type?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    confirmedAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bountyId" | "fromAddress" | "toAddress" | "amount" | "currency" | "txHash" | "status" | "type" | "errorMessage" | "createdAt" | "confirmedAt", ExtArgs["result"]["transaction"]>

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bountyId: string | null
      fromAddress: string
      toAddress: string
      amount: string
      currency: string
      txHash: string | null
      status: string
      type: string
      errorMessage: string | null
      createdAt: Date
      confirmedAt: Date | null
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
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
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
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
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly bountyId: FieldRef<"Transaction", 'String'>
    readonly fromAddress: FieldRef<"Transaction", 'String'>
    readonly toAddress: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'String'>
    readonly currency: FieldRef<"Transaction", 'String'>
    readonly txHash: FieldRef<"Transaction", 'String'>
    readonly status: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'String'>
    readonly errorMessage: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly confirmedAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
  }


  /**
   * Model Bounty
   */

  export type AggregateBounty = {
    _count: BountyCountAggregateOutputType | null
    _min: BountyMinAggregateOutputType | null
    _max: BountyMaxAggregateOutputType | null
  }

  export type BountyMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    rewardAmount: string | null
    currency: string | null
    hunterAddress: string | null
    status: $Enums.BountyStatus | null
    proofUrl: string | null
    proofCriteria: string | null
    escrowAddress: string | null
    creatorHashId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    expiresAt: Date | null
  }

  export type BountyMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    rewardAmount: string | null
    currency: string | null
    hunterAddress: string | null
    status: $Enums.BountyStatus | null
    proofUrl: string | null
    proofCriteria: string | null
    escrowAddress: string | null
    creatorHashId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    expiresAt: Date | null
  }

  export type BountyCountAggregateOutputType = {
    id: number
    title: number
    description: number
    rewardAmount: number
    currency: number
    hunterAddress: number
    status: number
    proofUrl: number
    proofCriteria: number
    escrowAddress: number
    creatorHashId: number
    createdAt: number
    updatedAt: number
    expiresAt: number
    _all: number
  }


  export type BountyMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    rewardAmount?: true
    currency?: true
    hunterAddress?: true
    status?: true
    proofUrl?: true
    proofCriteria?: true
    escrowAddress?: true
    creatorHashId?: true
    createdAt?: true
    updatedAt?: true
    expiresAt?: true
  }

  export type BountyMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    rewardAmount?: true
    currency?: true
    hunterAddress?: true
    status?: true
    proofUrl?: true
    proofCriteria?: true
    escrowAddress?: true
    creatorHashId?: true
    createdAt?: true
    updatedAt?: true
    expiresAt?: true
  }

  export type BountyCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    rewardAmount?: true
    currency?: true
    hunterAddress?: true
    status?: true
    proofUrl?: true
    proofCriteria?: true
    escrowAddress?: true
    creatorHashId?: true
    createdAt?: true
    updatedAt?: true
    expiresAt?: true
    _all?: true
  }

  export type BountyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bounty to aggregate.
     */
    where?: BountyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bounties to fetch.
     */
    orderBy?: BountyOrderByWithRelationInput | BountyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BountyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bounties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bounties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bounties
    **/
    _count?: true | BountyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BountyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BountyMaxAggregateInputType
  }

  export type GetBountyAggregateType<T extends BountyAggregateArgs> = {
        [P in keyof T & keyof AggregateBounty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBounty[P]>
      : GetScalarType<T[P], AggregateBounty[P]>
  }




  export type BountyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BountyWhereInput
    orderBy?: BountyOrderByWithAggregationInput | BountyOrderByWithAggregationInput[]
    by: BountyScalarFieldEnum[] | BountyScalarFieldEnum
    having?: BountyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BountyCountAggregateInputType | true
    _min?: BountyMinAggregateInputType
    _max?: BountyMaxAggregateInputType
  }

  export type BountyGroupByOutputType = {
    id: string
    title: string
    description: string
    rewardAmount: string
    currency: string
    hunterAddress: string | null
    status: $Enums.BountyStatus
    proofUrl: string | null
    proofCriteria: string | null
    escrowAddress: string | null
    creatorHashId: string
    createdAt: Date
    updatedAt: Date
    expiresAt: Date | null
    _count: BountyCountAggregateOutputType | null
    _min: BountyMinAggregateOutputType | null
    _max: BountyMaxAggregateOutputType | null
  }

  type GetBountyGroupByPayload<T extends BountyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BountyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BountyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BountyGroupByOutputType[P]>
            : GetScalarType<T[P], BountyGroupByOutputType[P]>
        }
      >
    >


  export type BountySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    rewardAmount?: boolean
    currency?: boolean
    hunterAddress?: boolean
    status?: boolean
    proofUrl?: boolean
    proofCriteria?: boolean
    escrowAddress?: boolean
    creatorHashId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiresAt?: boolean
    creator?: boolean | Bounty$creatorArgs<ExtArgs>
    registrations?: boolean | Bounty$registrationsArgs<ExtArgs>
    escrowWallet?: boolean | Bounty$escrowWalletArgs<ExtArgs>
    _count?: boolean | BountyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bounty"]>

  export type BountySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    rewardAmount?: boolean
    currency?: boolean
    hunterAddress?: boolean
    status?: boolean
    proofUrl?: boolean
    proofCriteria?: boolean
    escrowAddress?: boolean
    creatorHashId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiresAt?: boolean
    creator?: boolean | Bounty$creatorArgs<ExtArgs>
    escrowWallet?: boolean | Bounty$escrowWalletArgs<ExtArgs>
  }, ExtArgs["result"]["bounty"]>

  export type BountySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    rewardAmount?: boolean
    currency?: boolean
    hunterAddress?: boolean
    status?: boolean
    proofUrl?: boolean
    proofCriteria?: boolean
    escrowAddress?: boolean
    creatorHashId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiresAt?: boolean
    creator?: boolean | Bounty$creatorArgs<ExtArgs>
    escrowWallet?: boolean | Bounty$escrowWalletArgs<ExtArgs>
  }, ExtArgs["result"]["bounty"]>

  export type BountySelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    rewardAmount?: boolean
    currency?: boolean
    hunterAddress?: boolean
    status?: boolean
    proofUrl?: boolean
    proofCriteria?: boolean
    escrowAddress?: boolean
    creatorHashId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiresAt?: boolean
  }

  export type BountyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "rewardAmount" | "currency" | "hunterAddress" | "status" | "proofUrl" | "proofCriteria" | "escrowAddress" | "creatorHashId" | "createdAt" | "updatedAt" | "expiresAt", ExtArgs["result"]["bounty"]>
  export type BountyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | Bounty$creatorArgs<ExtArgs>
    registrations?: boolean | Bounty$registrationsArgs<ExtArgs>
    escrowWallet?: boolean | Bounty$escrowWalletArgs<ExtArgs>
    _count?: boolean | BountyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BountyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | Bounty$creatorArgs<ExtArgs>
    escrowWallet?: boolean | Bounty$escrowWalletArgs<ExtArgs>
  }
  export type BountyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | Bounty$creatorArgs<ExtArgs>
    escrowWallet?: boolean | Bounty$escrowWalletArgs<ExtArgs>
  }

  export type $BountyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bounty"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs> | null
      registrations: Prisma.$RegistrationPayload<ExtArgs>[]
      escrowWallet: Prisma.$WalletPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      rewardAmount: string
      currency: string
      hunterAddress: string | null
      status: $Enums.BountyStatus
      proofUrl: string | null
      proofCriteria: string | null
      escrowAddress: string | null
      creatorHashId: string
      createdAt: Date
      updatedAt: Date
      expiresAt: Date | null
    }, ExtArgs["result"]["bounty"]>
    composites: {}
  }

  type BountyGetPayload<S extends boolean | null | undefined | BountyDefaultArgs> = $Result.GetResult<Prisma.$BountyPayload, S>

  type BountyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BountyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BountyCountAggregateInputType | true
    }

  export interface BountyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bounty'], meta: { name: 'Bounty' } }
    /**
     * Find zero or one Bounty that matches the filter.
     * @param {BountyFindUniqueArgs} args - Arguments to find a Bounty
     * @example
     * // Get one Bounty
     * const bounty = await prisma.bounty.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BountyFindUniqueArgs>(args: SelectSubset<T, BountyFindUniqueArgs<ExtArgs>>): Prisma__BountyClient<$Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bounty that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BountyFindUniqueOrThrowArgs} args - Arguments to find a Bounty
     * @example
     * // Get one Bounty
     * const bounty = await prisma.bounty.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BountyFindUniqueOrThrowArgs>(args: SelectSubset<T, BountyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BountyClient<$Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bounty that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyFindFirstArgs} args - Arguments to find a Bounty
     * @example
     * // Get one Bounty
     * const bounty = await prisma.bounty.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BountyFindFirstArgs>(args?: SelectSubset<T, BountyFindFirstArgs<ExtArgs>>): Prisma__BountyClient<$Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bounty that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyFindFirstOrThrowArgs} args - Arguments to find a Bounty
     * @example
     * // Get one Bounty
     * const bounty = await prisma.bounty.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BountyFindFirstOrThrowArgs>(args?: SelectSubset<T, BountyFindFirstOrThrowArgs<ExtArgs>>): Prisma__BountyClient<$Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bounties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bounties
     * const bounties = await prisma.bounty.findMany()
     * 
     * // Get first 10 Bounties
     * const bounties = await prisma.bounty.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bountyWithIdOnly = await prisma.bounty.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BountyFindManyArgs>(args?: SelectSubset<T, BountyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bounty.
     * @param {BountyCreateArgs} args - Arguments to create a Bounty.
     * @example
     * // Create one Bounty
     * const Bounty = await prisma.bounty.create({
     *   data: {
     *     // ... data to create a Bounty
     *   }
     * })
     * 
     */
    create<T extends BountyCreateArgs>(args: SelectSubset<T, BountyCreateArgs<ExtArgs>>): Prisma__BountyClient<$Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bounties.
     * @param {BountyCreateManyArgs} args - Arguments to create many Bounties.
     * @example
     * // Create many Bounties
     * const bounty = await prisma.bounty.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BountyCreateManyArgs>(args?: SelectSubset<T, BountyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bounties and returns the data saved in the database.
     * @param {BountyCreateManyAndReturnArgs} args - Arguments to create many Bounties.
     * @example
     * // Create many Bounties
     * const bounty = await prisma.bounty.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bounties and only return the `id`
     * const bountyWithIdOnly = await prisma.bounty.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BountyCreateManyAndReturnArgs>(args?: SelectSubset<T, BountyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bounty.
     * @param {BountyDeleteArgs} args - Arguments to delete one Bounty.
     * @example
     * // Delete one Bounty
     * const Bounty = await prisma.bounty.delete({
     *   where: {
     *     // ... filter to delete one Bounty
     *   }
     * })
     * 
     */
    delete<T extends BountyDeleteArgs>(args: SelectSubset<T, BountyDeleteArgs<ExtArgs>>): Prisma__BountyClient<$Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bounty.
     * @param {BountyUpdateArgs} args - Arguments to update one Bounty.
     * @example
     * // Update one Bounty
     * const bounty = await prisma.bounty.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BountyUpdateArgs>(args: SelectSubset<T, BountyUpdateArgs<ExtArgs>>): Prisma__BountyClient<$Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bounties.
     * @param {BountyDeleteManyArgs} args - Arguments to filter Bounties to delete.
     * @example
     * // Delete a few Bounties
     * const { count } = await prisma.bounty.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BountyDeleteManyArgs>(args?: SelectSubset<T, BountyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bounties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bounties
     * const bounty = await prisma.bounty.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BountyUpdateManyArgs>(args: SelectSubset<T, BountyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bounties and returns the data updated in the database.
     * @param {BountyUpdateManyAndReturnArgs} args - Arguments to update many Bounties.
     * @example
     * // Update many Bounties
     * const bounty = await prisma.bounty.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bounties and only return the `id`
     * const bountyWithIdOnly = await prisma.bounty.updateManyAndReturn({
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
    updateManyAndReturn<T extends BountyUpdateManyAndReturnArgs>(args: SelectSubset<T, BountyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bounty.
     * @param {BountyUpsertArgs} args - Arguments to update or create a Bounty.
     * @example
     * // Update or create a Bounty
     * const bounty = await prisma.bounty.upsert({
     *   create: {
     *     // ... data to create a Bounty
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bounty we want to update
     *   }
     * })
     */
    upsert<T extends BountyUpsertArgs>(args: SelectSubset<T, BountyUpsertArgs<ExtArgs>>): Prisma__BountyClient<$Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bounties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyCountArgs} args - Arguments to filter Bounties to count.
     * @example
     * // Count the number of Bounties
     * const count = await prisma.bounty.count({
     *   where: {
     *     // ... the filter for the Bounties we want to count
     *   }
     * })
    **/
    count<T extends BountyCountArgs>(
      args?: Subset<T, BountyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BountyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bounty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BountyAggregateArgs>(args: Subset<T, BountyAggregateArgs>): Prisma.PrismaPromise<GetBountyAggregateType<T>>

    /**
     * Group by Bounty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyGroupByArgs} args - Group by arguments.
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
      T extends BountyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BountyGroupByArgs['orderBy'] }
        : { orderBy?: BountyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BountyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBountyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bounty model
   */
  readonly fields: BountyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bounty.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BountyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends Bounty$creatorArgs<ExtArgs> = {}>(args?: Subset<T, Bounty$creatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    registrations<T extends Bounty$registrationsArgs<ExtArgs> = {}>(args?: Subset<T, Bounty$registrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    escrowWallet<T extends Bounty$escrowWalletArgs<ExtArgs> = {}>(args?: Subset<T, Bounty$escrowWalletArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Bounty model
   */
  interface BountyFieldRefs {
    readonly id: FieldRef<"Bounty", 'String'>
    readonly title: FieldRef<"Bounty", 'String'>
    readonly description: FieldRef<"Bounty", 'String'>
    readonly rewardAmount: FieldRef<"Bounty", 'String'>
    readonly currency: FieldRef<"Bounty", 'String'>
    readonly hunterAddress: FieldRef<"Bounty", 'String'>
    readonly status: FieldRef<"Bounty", 'BountyStatus'>
    readonly proofUrl: FieldRef<"Bounty", 'String'>
    readonly proofCriteria: FieldRef<"Bounty", 'String'>
    readonly escrowAddress: FieldRef<"Bounty", 'String'>
    readonly creatorHashId: FieldRef<"Bounty", 'String'>
    readonly createdAt: FieldRef<"Bounty", 'DateTime'>
    readonly updatedAt: FieldRef<"Bounty", 'DateTime'>
    readonly expiresAt: FieldRef<"Bounty", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bounty findUnique
   */
  export type BountyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bounty
     */
    omit?: BountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BountyInclude<ExtArgs> | null
    /**
     * Filter, which Bounty to fetch.
     */
    where: BountyWhereUniqueInput
  }

  /**
   * Bounty findUniqueOrThrow
   */
  export type BountyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bounty
     */
    omit?: BountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BountyInclude<ExtArgs> | null
    /**
     * Filter, which Bounty to fetch.
     */
    where: BountyWhereUniqueInput
  }

  /**
   * Bounty findFirst
   */
  export type BountyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bounty
     */
    omit?: BountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BountyInclude<ExtArgs> | null
    /**
     * Filter, which Bounty to fetch.
     */
    where?: BountyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bounties to fetch.
     */
    orderBy?: BountyOrderByWithRelationInput | BountyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bounties.
     */
    cursor?: BountyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bounties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bounties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bounties.
     */
    distinct?: BountyScalarFieldEnum | BountyScalarFieldEnum[]
  }

  /**
   * Bounty findFirstOrThrow
   */
  export type BountyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bounty
     */
    omit?: BountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BountyInclude<ExtArgs> | null
    /**
     * Filter, which Bounty to fetch.
     */
    where?: BountyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bounties to fetch.
     */
    orderBy?: BountyOrderByWithRelationInput | BountyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bounties.
     */
    cursor?: BountyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bounties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bounties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bounties.
     */
    distinct?: BountyScalarFieldEnum | BountyScalarFieldEnum[]
  }

  /**
   * Bounty findMany
   */
  export type BountyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bounty
     */
    omit?: BountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BountyInclude<ExtArgs> | null
    /**
     * Filter, which Bounties to fetch.
     */
    where?: BountyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bounties to fetch.
     */
    orderBy?: BountyOrderByWithRelationInput | BountyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bounties.
     */
    cursor?: BountyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bounties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bounties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bounties.
     */
    distinct?: BountyScalarFieldEnum | BountyScalarFieldEnum[]
  }

  /**
   * Bounty create
   */
  export type BountyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bounty
     */
    omit?: BountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BountyInclude<ExtArgs> | null
    /**
     * The data needed to create a Bounty.
     */
    data: XOR<BountyCreateInput, BountyUncheckedCreateInput>
  }

  /**
   * Bounty createMany
   */
  export type BountyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bounties.
     */
    data: BountyCreateManyInput | BountyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bounty createManyAndReturn
   */
  export type BountyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bounty
     */
    omit?: BountyOmit<ExtArgs> | null
    /**
     * The data used to create many Bounties.
     */
    data: BountyCreateManyInput | BountyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BountyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bounty update
   */
  export type BountyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bounty
     */
    omit?: BountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BountyInclude<ExtArgs> | null
    /**
     * The data needed to update a Bounty.
     */
    data: XOR<BountyUpdateInput, BountyUncheckedUpdateInput>
    /**
     * Choose, which Bounty to update.
     */
    where: BountyWhereUniqueInput
  }

  /**
   * Bounty updateMany
   */
  export type BountyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bounties.
     */
    data: XOR<BountyUpdateManyMutationInput, BountyUncheckedUpdateManyInput>
    /**
     * Filter which Bounties to update
     */
    where?: BountyWhereInput
    /**
     * Limit how many Bounties to update.
     */
    limit?: number
  }

  /**
   * Bounty updateManyAndReturn
   */
  export type BountyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bounty
     */
    omit?: BountyOmit<ExtArgs> | null
    /**
     * The data used to update Bounties.
     */
    data: XOR<BountyUpdateManyMutationInput, BountyUncheckedUpdateManyInput>
    /**
     * Filter which Bounties to update
     */
    where?: BountyWhereInput
    /**
     * Limit how many Bounties to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BountyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bounty upsert
   */
  export type BountyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bounty
     */
    omit?: BountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BountyInclude<ExtArgs> | null
    /**
     * The filter to search for the Bounty to update in case it exists.
     */
    where: BountyWhereUniqueInput
    /**
     * In case the Bounty found by the `where` argument doesn't exist, create a new Bounty with this data.
     */
    create: XOR<BountyCreateInput, BountyUncheckedCreateInput>
    /**
     * In case the Bounty was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BountyUpdateInput, BountyUncheckedUpdateInput>
  }

  /**
   * Bounty delete
   */
  export type BountyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bounty
     */
    omit?: BountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BountyInclude<ExtArgs> | null
    /**
     * Filter which Bounty to delete.
     */
    where: BountyWhereUniqueInput
  }

  /**
   * Bounty deleteMany
   */
  export type BountyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bounties to delete
     */
    where?: BountyWhereInput
    /**
     * Limit how many Bounties to delete.
     */
    limit?: number
  }

  /**
   * Bounty.creator
   */
  export type Bounty$creatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Bounty.registrations
   */
  export type Bounty$registrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    where?: RegistrationWhereInput
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    cursor?: RegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * Bounty.escrowWallet
   */
  export type Bounty$escrowWalletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    where?: WalletWhereInput
  }

  /**
   * Bounty without action
   */
  export type BountyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bounty
     */
    omit?: BountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BountyInclude<ExtArgs> | null
  }


  /**
   * Model Registration
   */

  export type AggregateRegistration = {
    _count: RegistrationCountAggregateOutputType | null
    _min: RegistrationMinAggregateOutputType | null
    _max: RegistrationMaxAggregateOutputType | null
  }

  export type RegistrationMinAggregateOutputType = {
    id: string | null
    bountyId: string | null
    hunterAddress: string | null
    status: $Enums.RegistrationStatus | null
    proofUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RegistrationMaxAggregateOutputType = {
    id: string | null
    bountyId: string | null
    hunterAddress: string | null
    status: $Enums.RegistrationStatus | null
    proofUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RegistrationCountAggregateOutputType = {
    id: number
    bountyId: number
    hunterAddress: number
    status: number
    proofUrl: number
    verificationResult: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RegistrationMinAggregateInputType = {
    id?: true
    bountyId?: true
    hunterAddress?: true
    status?: true
    proofUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RegistrationMaxAggregateInputType = {
    id?: true
    bountyId?: true
    hunterAddress?: true
    status?: true
    proofUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RegistrationCountAggregateInputType = {
    id?: true
    bountyId?: true
    hunterAddress?: true
    status?: true
    proofUrl?: true
    verificationResult?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RegistrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Registration to aggregate.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Registrations
    **/
    _count?: true | RegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegistrationMaxAggregateInputType
  }

  export type GetRegistrationAggregateType<T extends RegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregateRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegistration[P]>
      : GetScalarType<T[P], AggregateRegistration[P]>
  }




  export type RegistrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrationWhereInput
    orderBy?: RegistrationOrderByWithAggregationInput | RegistrationOrderByWithAggregationInput[]
    by: RegistrationScalarFieldEnum[] | RegistrationScalarFieldEnum
    having?: RegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegistrationCountAggregateInputType | true
    _min?: RegistrationMinAggregateInputType
    _max?: RegistrationMaxAggregateInputType
  }

  export type RegistrationGroupByOutputType = {
    id: string
    bountyId: string
    hunterAddress: string
    status: $Enums.RegistrationStatus
    proofUrl: string | null
    verificationResult: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: RegistrationCountAggregateOutputType | null
    _min: RegistrationMinAggregateOutputType | null
    _max: RegistrationMaxAggregateOutputType | null
  }

  type GetRegistrationGroupByPayload<T extends RegistrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], RegistrationGroupByOutputType[P]>
        }
      >
    >


  export type RegistrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bountyId?: boolean
    hunterAddress?: boolean
    status?: boolean
    proofUrl?: boolean
    verificationResult?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bounty?: boolean | BountyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registration"]>

  export type RegistrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bountyId?: boolean
    hunterAddress?: boolean
    status?: boolean
    proofUrl?: boolean
    verificationResult?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bounty?: boolean | BountyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registration"]>

  export type RegistrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bountyId?: boolean
    hunterAddress?: boolean
    status?: boolean
    proofUrl?: boolean
    verificationResult?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bounty?: boolean | BountyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registration"]>

  export type RegistrationSelectScalar = {
    id?: boolean
    bountyId?: boolean
    hunterAddress?: boolean
    status?: boolean
    proofUrl?: boolean
    verificationResult?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RegistrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bountyId" | "hunterAddress" | "status" | "proofUrl" | "verificationResult" | "createdAt" | "updatedAt", ExtArgs["result"]["registration"]>
  export type RegistrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bounty?: boolean | BountyDefaultArgs<ExtArgs>
  }
  export type RegistrationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bounty?: boolean | BountyDefaultArgs<ExtArgs>
  }
  export type RegistrationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bounty?: boolean | BountyDefaultArgs<ExtArgs>
  }

  export type $RegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Registration"
    objects: {
      bounty: Prisma.$BountyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bountyId: string
      hunterAddress: string
      status: $Enums.RegistrationStatus
      proofUrl: string | null
      verificationResult: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["registration"]>
    composites: {}
  }

  type RegistrationGetPayload<S extends boolean | null | undefined | RegistrationDefaultArgs> = $Result.GetResult<Prisma.$RegistrationPayload, S>

  type RegistrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegistrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegistrationCountAggregateInputType | true
    }

  export interface RegistrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Registration'], meta: { name: 'Registration' } }
    /**
     * Find zero or one Registration that matches the filter.
     * @param {RegistrationFindUniqueArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegistrationFindUniqueArgs>(args: SelectSubset<T, RegistrationFindUniqueArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Registration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegistrationFindUniqueOrThrowArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegistrationFindUniqueOrThrowArgs>(args: SelectSubset<T, RegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Registration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationFindFirstArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegistrationFindFirstArgs>(args?: SelectSubset<T, RegistrationFindFirstArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Registration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationFindFirstOrThrowArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegistrationFindFirstOrThrowArgs>(args?: SelectSubset<T, RegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Registrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Registrations
     * const registrations = await prisma.registration.findMany()
     * 
     * // Get first 10 Registrations
     * const registrations = await prisma.registration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const registrationWithIdOnly = await prisma.registration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegistrationFindManyArgs>(args?: SelectSubset<T, RegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Registration.
     * @param {RegistrationCreateArgs} args - Arguments to create a Registration.
     * @example
     * // Create one Registration
     * const Registration = await prisma.registration.create({
     *   data: {
     *     // ... data to create a Registration
     *   }
     * })
     * 
     */
    create<T extends RegistrationCreateArgs>(args: SelectSubset<T, RegistrationCreateArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Registrations.
     * @param {RegistrationCreateManyArgs} args - Arguments to create many Registrations.
     * @example
     * // Create many Registrations
     * const registration = await prisma.registration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegistrationCreateManyArgs>(args?: SelectSubset<T, RegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Registrations and returns the data saved in the database.
     * @param {RegistrationCreateManyAndReturnArgs} args - Arguments to create many Registrations.
     * @example
     * // Create many Registrations
     * const registration = await prisma.registration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Registrations and only return the `id`
     * const registrationWithIdOnly = await prisma.registration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegistrationCreateManyAndReturnArgs>(args?: SelectSubset<T, RegistrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Registration.
     * @param {RegistrationDeleteArgs} args - Arguments to delete one Registration.
     * @example
     * // Delete one Registration
     * const Registration = await prisma.registration.delete({
     *   where: {
     *     // ... filter to delete one Registration
     *   }
     * })
     * 
     */
    delete<T extends RegistrationDeleteArgs>(args: SelectSubset<T, RegistrationDeleteArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Registration.
     * @param {RegistrationUpdateArgs} args - Arguments to update one Registration.
     * @example
     * // Update one Registration
     * const registration = await prisma.registration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegistrationUpdateArgs>(args: SelectSubset<T, RegistrationUpdateArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Registrations.
     * @param {RegistrationDeleteManyArgs} args - Arguments to filter Registrations to delete.
     * @example
     * // Delete a few Registrations
     * const { count } = await prisma.registration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegistrationDeleteManyArgs>(args?: SelectSubset<T, RegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Registrations
     * const registration = await prisma.registration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegistrationUpdateManyArgs>(args: SelectSubset<T, RegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Registrations and returns the data updated in the database.
     * @param {RegistrationUpdateManyAndReturnArgs} args - Arguments to update many Registrations.
     * @example
     * // Update many Registrations
     * const registration = await prisma.registration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Registrations and only return the `id`
     * const registrationWithIdOnly = await prisma.registration.updateManyAndReturn({
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
    updateManyAndReturn<T extends RegistrationUpdateManyAndReturnArgs>(args: SelectSubset<T, RegistrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Registration.
     * @param {RegistrationUpsertArgs} args - Arguments to update or create a Registration.
     * @example
     * // Update or create a Registration
     * const registration = await prisma.registration.upsert({
     *   create: {
     *     // ... data to create a Registration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Registration we want to update
     *   }
     * })
     */
    upsert<T extends RegistrationUpsertArgs>(args: SelectSubset<T, RegistrationUpsertArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationCountArgs} args - Arguments to filter Registrations to count.
     * @example
     * // Count the number of Registrations
     * const count = await prisma.registration.count({
     *   where: {
     *     // ... the filter for the Registrations we want to count
     *   }
     * })
    **/
    count<T extends RegistrationCountArgs>(
      args?: Subset<T, RegistrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Registration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RegistrationAggregateArgs>(args: Subset<T, RegistrationAggregateArgs>): Prisma.PrismaPromise<GetRegistrationAggregateType<T>>

    /**
     * Group by Registration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationGroupByArgs} args - Group by arguments.
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
      T extends RegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegistrationGroupByArgs['orderBy'] }
        : { orderBy?: RegistrationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Registration model
   */
  readonly fields: RegistrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Registration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegistrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bounty<T extends BountyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BountyDefaultArgs<ExtArgs>>): Prisma__BountyClient<$Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Registration model
   */
  interface RegistrationFieldRefs {
    readonly id: FieldRef<"Registration", 'String'>
    readonly bountyId: FieldRef<"Registration", 'String'>
    readonly hunterAddress: FieldRef<"Registration", 'String'>
    readonly status: FieldRef<"Registration", 'RegistrationStatus'>
    readonly proofUrl: FieldRef<"Registration", 'String'>
    readonly verificationResult: FieldRef<"Registration", 'Json'>
    readonly createdAt: FieldRef<"Registration", 'DateTime'>
    readonly updatedAt: FieldRef<"Registration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Registration findUnique
   */
  export type RegistrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration findUniqueOrThrow
   */
  export type RegistrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration findFirst
   */
  export type RegistrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Registrations.
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Registrations.
     */
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * Registration findFirstOrThrow
   */
  export type RegistrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Registrations.
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Registrations.
     */
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * Registration findMany
   */
  export type RegistrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registrations to fetch.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Registrations.
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Registrations.
     */
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * Registration create
   */
  export type RegistrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * The data needed to create a Registration.
     */
    data: XOR<RegistrationCreateInput, RegistrationUncheckedCreateInput>
  }

  /**
   * Registration createMany
   */
  export type RegistrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Registrations.
     */
    data: RegistrationCreateManyInput | RegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Registration createManyAndReturn
   */
  export type RegistrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * The data used to create many Registrations.
     */
    data: RegistrationCreateManyInput | RegistrationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Registration update
   */
  export type RegistrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * The data needed to update a Registration.
     */
    data: XOR<RegistrationUpdateInput, RegistrationUncheckedUpdateInput>
    /**
     * Choose, which Registration to update.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration updateMany
   */
  export type RegistrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Registrations.
     */
    data: XOR<RegistrationUpdateManyMutationInput, RegistrationUncheckedUpdateManyInput>
    /**
     * Filter which Registrations to update
     */
    where?: RegistrationWhereInput
    /**
     * Limit how many Registrations to update.
     */
    limit?: number
  }

  /**
   * Registration updateManyAndReturn
   */
  export type RegistrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * The data used to update Registrations.
     */
    data: XOR<RegistrationUpdateManyMutationInput, RegistrationUncheckedUpdateManyInput>
    /**
     * Filter which Registrations to update
     */
    where?: RegistrationWhereInput
    /**
     * Limit how many Registrations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Registration upsert
   */
  export type RegistrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * The filter to search for the Registration to update in case it exists.
     */
    where: RegistrationWhereUniqueInput
    /**
     * In case the Registration found by the `where` argument doesn't exist, create a new Registration with this data.
     */
    create: XOR<RegistrationCreateInput, RegistrationUncheckedCreateInput>
    /**
     * In case the Registration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegistrationUpdateInput, RegistrationUncheckedUpdateInput>
  }

  /**
   * Registration delete
   */
  export type RegistrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter which Registration to delete.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration deleteMany
   */
  export type RegistrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Registrations to delete
     */
    where?: RegistrationWhereInput
    /**
     * Limit how many Registrations to delete.
     */
    limit?: number
  }

  /**
   * Registration without action
   */
  export type RegistrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
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
   * Model BountyClawIdentity
   */

  export type AggregateBountyClawIdentity = {
    _count: BountyClawIdentityCountAggregateOutputType | null
    _avg: BountyClawIdentityAvgAggregateOutputType | null
    _sum: BountyClawIdentitySumAggregateOutputType | null
    _min: BountyClawIdentityMinAggregateOutputType | null
    _max: BountyClawIdentityMaxAggregateOutputType | null
  }

  export type BountyClawIdentityAvgAggregateOutputType = {
    chainId: number | null
  }

  export type BountyClawIdentitySumAggregateOutputType = {
    chainId: number | null
  }

  export type BountyClawIdentityMinAggregateOutputType = {
    id: string | null
    agentName: string | null
    identityAddress: string | null
    metadataUri: string | null
    a2aEndpoint: string | null
    chainId: number | null
    coordinatorUrl: string | null
    txHash: string | null
    registeredAt: Date | null
    lastVerifiedAt: Date | null
    isActive: boolean | null
  }

  export type BountyClawIdentityMaxAggregateOutputType = {
    id: string | null
    agentName: string | null
    identityAddress: string | null
    metadataUri: string | null
    a2aEndpoint: string | null
    chainId: number | null
    coordinatorUrl: string | null
    txHash: string | null
    registeredAt: Date | null
    lastVerifiedAt: Date | null
    isActive: boolean | null
  }

  export type BountyClawIdentityCountAggregateOutputType = {
    id: number
    agentName: number
    identityAddress: number
    metadataUri: number
    a2aEndpoint: number
    chainId: number
    coordinatorUrl: number
    txHash: number
    registeredAt: number
    lastVerifiedAt: number
    isActive: number
    _all: number
  }


  export type BountyClawIdentityAvgAggregateInputType = {
    chainId?: true
  }

  export type BountyClawIdentitySumAggregateInputType = {
    chainId?: true
  }

  export type BountyClawIdentityMinAggregateInputType = {
    id?: true
    agentName?: true
    identityAddress?: true
    metadataUri?: true
    a2aEndpoint?: true
    chainId?: true
    coordinatorUrl?: true
    txHash?: true
    registeredAt?: true
    lastVerifiedAt?: true
    isActive?: true
  }

  export type BountyClawIdentityMaxAggregateInputType = {
    id?: true
    agentName?: true
    identityAddress?: true
    metadataUri?: true
    a2aEndpoint?: true
    chainId?: true
    coordinatorUrl?: true
    txHash?: true
    registeredAt?: true
    lastVerifiedAt?: true
    isActive?: true
  }

  export type BountyClawIdentityCountAggregateInputType = {
    id?: true
    agentName?: true
    identityAddress?: true
    metadataUri?: true
    a2aEndpoint?: true
    chainId?: true
    coordinatorUrl?: true
    txHash?: true
    registeredAt?: true
    lastVerifiedAt?: true
    isActive?: true
    _all?: true
  }

  export type BountyClawIdentityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BountyClawIdentity to aggregate.
     */
    where?: BountyClawIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BountyClawIdentities to fetch.
     */
    orderBy?: BountyClawIdentityOrderByWithRelationInput | BountyClawIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BountyClawIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BountyClawIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BountyClawIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BountyClawIdentities
    **/
    _count?: true | BountyClawIdentityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BountyClawIdentityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BountyClawIdentitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BountyClawIdentityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BountyClawIdentityMaxAggregateInputType
  }

  export type GetBountyClawIdentityAggregateType<T extends BountyClawIdentityAggregateArgs> = {
        [P in keyof T & keyof AggregateBountyClawIdentity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBountyClawIdentity[P]>
      : GetScalarType<T[P], AggregateBountyClawIdentity[P]>
  }




  export type BountyClawIdentityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BountyClawIdentityWhereInput
    orderBy?: BountyClawIdentityOrderByWithAggregationInput | BountyClawIdentityOrderByWithAggregationInput[]
    by: BountyClawIdentityScalarFieldEnum[] | BountyClawIdentityScalarFieldEnum
    having?: BountyClawIdentityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BountyClawIdentityCountAggregateInputType | true
    _avg?: BountyClawIdentityAvgAggregateInputType
    _sum?: BountyClawIdentitySumAggregateInputType
    _min?: BountyClawIdentityMinAggregateInputType
    _max?: BountyClawIdentityMaxAggregateInputType
  }

  export type BountyClawIdentityGroupByOutputType = {
    id: string
    agentName: string
    identityAddress: string
    metadataUri: string
    a2aEndpoint: string
    chainId: number
    coordinatorUrl: string
    txHash: string | null
    registeredAt: Date
    lastVerifiedAt: Date
    isActive: boolean
    _count: BountyClawIdentityCountAggregateOutputType | null
    _avg: BountyClawIdentityAvgAggregateOutputType | null
    _sum: BountyClawIdentitySumAggregateOutputType | null
    _min: BountyClawIdentityMinAggregateOutputType | null
    _max: BountyClawIdentityMaxAggregateOutputType | null
  }

  type GetBountyClawIdentityGroupByPayload<T extends BountyClawIdentityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BountyClawIdentityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BountyClawIdentityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BountyClawIdentityGroupByOutputType[P]>
            : GetScalarType<T[P], BountyClawIdentityGroupByOutputType[P]>
        }
      >
    >


  export type BountyClawIdentitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentName?: boolean
    identityAddress?: boolean
    metadataUri?: boolean
    a2aEndpoint?: boolean
    chainId?: boolean
    coordinatorUrl?: boolean
    txHash?: boolean
    registeredAt?: boolean
    lastVerifiedAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["bountyClawIdentity"]>

  export type BountyClawIdentitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentName?: boolean
    identityAddress?: boolean
    metadataUri?: boolean
    a2aEndpoint?: boolean
    chainId?: boolean
    coordinatorUrl?: boolean
    txHash?: boolean
    registeredAt?: boolean
    lastVerifiedAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["bountyClawIdentity"]>

  export type BountyClawIdentitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentName?: boolean
    identityAddress?: boolean
    metadataUri?: boolean
    a2aEndpoint?: boolean
    chainId?: boolean
    coordinatorUrl?: boolean
    txHash?: boolean
    registeredAt?: boolean
    lastVerifiedAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["bountyClawIdentity"]>

  export type BountyClawIdentitySelectScalar = {
    id?: boolean
    agentName?: boolean
    identityAddress?: boolean
    metadataUri?: boolean
    a2aEndpoint?: boolean
    chainId?: boolean
    coordinatorUrl?: boolean
    txHash?: boolean
    registeredAt?: boolean
    lastVerifiedAt?: boolean
    isActive?: boolean
  }

  export type BountyClawIdentityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentName" | "identityAddress" | "metadataUri" | "a2aEndpoint" | "chainId" | "coordinatorUrl" | "txHash" | "registeredAt" | "lastVerifiedAt" | "isActive", ExtArgs["result"]["bountyClawIdentity"]>

  export type $BountyClawIdentityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BountyClawIdentity"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentName: string
      identityAddress: string
      metadataUri: string
      a2aEndpoint: string
      chainId: number
      coordinatorUrl: string
      txHash: string | null
      registeredAt: Date
      lastVerifiedAt: Date
      isActive: boolean
    }, ExtArgs["result"]["bountyClawIdentity"]>
    composites: {}
  }

  type BountyClawIdentityGetPayload<S extends boolean | null | undefined | BountyClawIdentityDefaultArgs> = $Result.GetResult<Prisma.$BountyClawIdentityPayload, S>

  type BountyClawIdentityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BountyClawIdentityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BountyClawIdentityCountAggregateInputType | true
    }

  export interface BountyClawIdentityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BountyClawIdentity'], meta: { name: 'BountyClawIdentity' } }
    /**
     * Find zero or one BountyClawIdentity that matches the filter.
     * @param {BountyClawIdentityFindUniqueArgs} args - Arguments to find a BountyClawIdentity
     * @example
     * // Get one BountyClawIdentity
     * const bountyClawIdentity = await prisma.bountyClawIdentity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BountyClawIdentityFindUniqueArgs>(args: SelectSubset<T, BountyClawIdentityFindUniqueArgs<ExtArgs>>): Prisma__BountyClawIdentityClient<$Result.GetResult<Prisma.$BountyClawIdentityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BountyClawIdentity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BountyClawIdentityFindUniqueOrThrowArgs} args - Arguments to find a BountyClawIdentity
     * @example
     * // Get one BountyClawIdentity
     * const bountyClawIdentity = await prisma.bountyClawIdentity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BountyClawIdentityFindUniqueOrThrowArgs>(args: SelectSubset<T, BountyClawIdentityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BountyClawIdentityClient<$Result.GetResult<Prisma.$BountyClawIdentityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BountyClawIdentity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyClawIdentityFindFirstArgs} args - Arguments to find a BountyClawIdentity
     * @example
     * // Get one BountyClawIdentity
     * const bountyClawIdentity = await prisma.bountyClawIdentity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BountyClawIdentityFindFirstArgs>(args?: SelectSubset<T, BountyClawIdentityFindFirstArgs<ExtArgs>>): Prisma__BountyClawIdentityClient<$Result.GetResult<Prisma.$BountyClawIdentityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BountyClawIdentity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyClawIdentityFindFirstOrThrowArgs} args - Arguments to find a BountyClawIdentity
     * @example
     * // Get one BountyClawIdentity
     * const bountyClawIdentity = await prisma.bountyClawIdentity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BountyClawIdentityFindFirstOrThrowArgs>(args?: SelectSubset<T, BountyClawIdentityFindFirstOrThrowArgs<ExtArgs>>): Prisma__BountyClawIdentityClient<$Result.GetResult<Prisma.$BountyClawIdentityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BountyClawIdentities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyClawIdentityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BountyClawIdentities
     * const bountyClawIdentities = await prisma.bountyClawIdentity.findMany()
     * 
     * // Get first 10 BountyClawIdentities
     * const bountyClawIdentities = await prisma.bountyClawIdentity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bountyClawIdentityWithIdOnly = await prisma.bountyClawIdentity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BountyClawIdentityFindManyArgs>(args?: SelectSubset<T, BountyClawIdentityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BountyClawIdentityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BountyClawIdentity.
     * @param {BountyClawIdentityCreateArgs} args - Arguments to create a BountyClawIdentity.
     * @example
     * // Create one BountyClawIdentity
     * const BountyClawIdentity = await prisma.bountyClawIdentity.create({
     *   data: {
     *     // ... data to create a BountyClawIdentity
     *   }
     * })
     * 
     */
    create<T extends BountyClawIdentityCreateArgs>(args: SelectSubset<T, BountyClawIdentityCreateArgs<ExtArgs>>): Prisma__BountyClawIdentityClient<$Result.GetResult<Prisma.$BountyClawIdentityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BountyClawIdentities.
     * @param {BountyClawIdentityCreateManyArgs} args - Arguments to create many BountyClawIdentities.
     * @example
     * // Create many BountyClawIdentities
     * const bountyClawIdentity = await prisma.bountyClawIdentity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BountyClawIdentityCreateManyArgs>(args?: SelectSubset<T, BountyClawIdentityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BountyClawIdentities and returns the data saved in the database.
     * @param {BountyClawIdentityCreateManyAndReturnArgs} args - Arguments to create many BountyClawIdentities.
     * @example
     * // Create many BountyClawIdentities
     * const bountyClawIdentity = await prisma.bountyClawIdentity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BountyClawIdentities and only return the `id`
     * const bountyClawIdentityWithIdOnly = await prisma.bountyClawIdentity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BountyClawIdentityCreateManyAndReturnArgs>(args?: SelectSubset<T, BountyClawIdentityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BountyClawIdentityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BountyClawIdentity.
     * @param {BountyClawIdentityDeleteArgs} args - Arguments to delete one BountyClawIdentity.
     * @example
     * // Delete one BountyClawIdentity
     * const BountyClawIdentity = await prisma.bountyClawIdentity.delete({
     *   where: {
     *     // ... filter to delete one BountyClawIdentity
     *   }
     * })
     * 
     */
    delete<T extends BountyClawIdentityDeleteArgs>(args: SelectSubset<T, BountyClawIdentityDeleteArgs<ExtArgs>>): Prisma__BountyClawIdentityClient<$Result.GetResult<Prisma.$BountyClawIdentityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BountyClawIdentity.
     * @param {BountyClawIdentityUpdateArgs} args - Arguments to update one BountyClawIdentity.
     * @example
     * // Update one BountyClawIdentity
     * const bountyClawIdentity = await prisma.bountyClawIdentity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BountyClawIdentityUpdateArgs>(args: SelectSubset<T, BountyClawIdentityUpdateArgs<ExtArgs>>): Prisma__BountyClawIdentityClient<$Result.GetResult<Prisma.$BountyClawIdentityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BountyClawIdentities.
     * @param {BountyClawIdentityDeleteManyArgs} args - Arguments to filter BountyClawIdentities to delete.
     * @example
     * // Delete a few BountyClawIdentities
     * const { count } = await prisma.bountyClawIdentity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BountyClawIdentityDeleteManyArgs>(args?: SelectSubset<T, BountyClawIdentityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BountyClawIdentities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyClawIdentityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BountyClawIdentities
     * const bountyClawIdentity = await prisma.bountyClawIdentity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BountyClawIdentityUpdateManyArgs>(args: SelectSubset<T, BountyClawIdentityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BountyClawIdentities and returns the data updated in the database.
     * @param {BountyClawIdentityUpdateManyAndReturnArgs} args - Arguments to update many BountyClawIdentities.
     * @example
     * // Update many BountyClawIdentities
     * const bountyClawIdentity = await prisma.bountyClawIdentity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BountyClawIdentities and only return the `id`
     * const bountyClawIdentityWithIdOnly = await prisma.bountyClawIdentity.updateManyAndReturn({
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
    updateManyAndReturn<T extends BountyClawIdentityUpdateManyAndReturnArgs>(args: SelectSubset<T, BountyClawIdentityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BountyClawIdentityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BountyClawIdentity.
     * @param {BountyClawIdentityUpsertArgs} args - Arguments to update or create a BountyClawIdentity.
     * @example
     * // Update or create a BountyClawIdentity
     * const bountyClawIdentity = await prisma.bountyClawIdentity.upsert({
     *   create: {
     *     // ... data to create a BountyClawIdentity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BountyClawIdentity we want to update
     *   }
     * })
     */
    upsert<T extends BountyClawIdentityUpsertArgs>(args: SelectSubset<T, BountyClawIdentityUpsertArgs<ExtArgs>>): Prisma__BountyClawIdentityClient<$Result.GetResult<Prisma.$BountyClawIdentityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BountyClawIdentities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyClawIdentityCountArgs} args - Arguments to filter BountyClawIdentities to count.
     * @example
     * // Count the number of BountyClawIdentities
     * const count = await prisma.bountyClawIdentity.count({
     *   where: {
     *     // ... the filter for the BountyClawIdentities we want to count
     *   }
     * })
    **/
    count<T extends BountyClawIdentityCountArgs>(
      args?: Subset<T, BountyClawIdentityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BountyClawIdentityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BountyClawIdentity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyClawIdentityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BountyClawIdentityAggregateArgs>(args: Subset<T, BountyClawIdentityAggregateArgs>): Prisma.PrismaPromise<GetBountyClawIdentityAggregateType<T>>

    /**
     * Group by BountyClawIdentity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyClawIdentityGroupByArgs} args - Group by arguments.
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
      T extends BountyClawIdentityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BountyClawIdentityGroupByArgs['orderBy'] }
        : { orderBy?: BountyClawIdentityGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BountyClawIdentityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBountyClawIdentityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BountyClawIdentity model
   */
  readonly fields: BountyClawIdentityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BountyClawIdentity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BountyClawIdentityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the BountyClawIdentity model
   */
  interface BountyClawIdentityFieldRefs {
    readonly id: FieldRef<"BountyClawIdentity", 'String'>
    readonly agentName: FieldRef<"BountyClawIdentity", 'String'>
    readonly identityAddress: FieldRef<"BountyClawIdentity", 'String'>
    readonly metadataUri: FieldRef<"BountyClawIdentity", 'String'>
    readonly a2aEndpoint: FieldRef<"BountyClawIdentity", 'String'>
    readonly chainId: FieldRef<"BountyClawIdentity", 'Int'>
    readonly coordinatorUrl: FieldRef<"BountyClawIdentity", 'String'>
    readonly txHash: FieldRef<"BountyClawIdentity", 'String'>
    readonly registeredAt: FieldRef<"BountyClawIdentity", 'DateTime'>
    readonly lastVerifiedAt: FieldRef<"BountyClawIdentity", 'DateTime'>
    readonly isActive: FieldRef<"BountyClawIdentity", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * BountyClawIdentity findUnique
   */
  export type BountyClawIdentityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BountyClawIdentity
     */
    select?: BountyClawIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BountyClawIdentity
     */
    omit?: BountyClawIdentityOmit<ExtArgs> | null
    /**
     * Filter, which BountyClawIdentity to fetch.
     */
    where: BountyClawIdentityWhereUniqueInput
  }

  /**
   * BountyClawIdentity findUniqueOrThrow
   */
  export type BountyClawIdentityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BountyClawIdentity
     */
    select?: BountyClawIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BountyClawIdentity
     */
    omit?: BountyClawIdentityOmit<ExtArgs> | null
    /**
     * Filter, which BountyClawIdentity to fetch.
     */
    where: BountyClawIdentityWhereUniqueInput
  }

  /**
   * BountyClawIdentity findFirst
   */
  export type BountyClawIdentityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BountyClawIdentity
     */
    select?: BountyClawIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BountyClawIdentity
     */
    omit?: BountyClawIdentityOmit<ExtArgs> | null
    /**
     * Filter, which BountyClawIdentity to fetch.
     */
    where?: BountyClawIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BountyClawIdentities to fetch.
     */
    orderBy?: BountyClawIdentityOrderByWithRelationInput | BountyClawIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BountyClawIdentities.
     */
    cursor?: BountyClawIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BountyClawIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BountyClawIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BountyClawIdentities.
     */
    distinct?: BountyClawIdentityScalarFieldEnum | BountyClawIdentityScalarFieldEnum[]
  }

  /**
   * BountyClawIdentity findFirstOrThrow
   */
  export type BountyClawIdentityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BountyClawIdentity
     */
    select?: BountyClawIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BountyClawIdentity
     */
    omit?: BountyClawIdentityOmit<ExtArgs> | null
    /**
     * Filter, which BountyClawIdentity to fetch.
     */
    where?: BountyClawIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BountyClawIdentities to fetch.
     */
    orderBy?: BountyClawIdentityOrderByWithRelationInput | BountyClawIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BountyClawIdentities.
     */
    cursor?: BountyClawIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BountyClawIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BountyClawIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BountyClawIdentities.
     */
    distinct?: BountyClawIdentityScalarFieldEnum | BountyClawIdentityScalarFieldEnum[]
  }

  /**
   * BountyClawIdentity findMany
   */
  export type BountyClawIdentityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BountyClawIdentity
     */
    select?: BountyClawIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BountyClawIdentity
     */
    omit?: BountyClawIdentityOmit<ExtArgs> | null
    /**
     * Filter, which BountyClawIdentities to fetch.
     */
    where?: BountyClawIdentityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BountyClawIdentities to fetch.
     */
    orderBy?: BountyClawIdentityOrderByWithRelationInput | BountyClawIdentityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BountyClawIdentities.
     */
    cursor?: BountyClawIdentityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BountyClawIdentities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BountyClawIdentities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BountyClawIdentities.
     */
    distinct?: BountyClawIdentityScalarFieldEnum | BountyClawIdentityScalarFieldEnum[]
  }

  /**
   * BountyClawIdentity create
   */
  export type BountyClawIdentityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BountyClawIdentity
     */
    select?: BountyClawIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BountyClawIdentity
     */
    omit?: BountyClawIdentityOmit<ExtArgs> | null
    /**
     * The data needed to create a BountyClawIdentity.
     */
    data: XOR<BountyClawIdentityCreateInput, BountyClawIdentityUncheckedCreateInput>
  }

  /**
   * BountyClawIdentity createMany
   */
  export type BountyClawIdentityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BountyClawIdentities.
     */
    data: BountyClawIdentityCreateManyInput | BountyClawIdentityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BountyClawIdentity createManyAndReturn
   */
  export type BountyClawIdentityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BountyClawIdentity
     */
    select?: BountyClawIdentitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BountyClawIdentity
     */
    omit?: BountyClawIdentityOmit<ExtArgs> | null
    /**
     * The data used to create many BountyClawIdentities.
     */
    data: BountyClawIdentityCreateManyInput | BountyClawIdentityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BountyClawIdentity update
   */
  export type BountyClawIdentityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BountyClawIdentity
     */
    select?: BountyClawIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BountyClawIdentity
     */
    omit?: BountyClawIdentityOmit<ExtArgs> | null
    /**
     * The data needed to update a BountyClawIdentity.
     */
    data: XOR<BountyClawIdentityUpdateInput, BountyClawIdentityUncheckedUpdateInput>
    /**
     * Choose, which BountyClawIdentity to update.
     */
    where: BountyClawIdentityWhereUniqueInput
  }

  /**
   * BountyClawIdentity updateMany
   */
  export type BountyClawIdentityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BountyClawIdentities.
     */
    data: XOR<BountyClawIdentityUpdateManyMutationInput, BountyClawIdentityUncheckedUpdateManyInput>
    /**
     * Filter which BountyClawIdentities to update
     */
    where?: BountyClawIdentityWhereInput
    /**
     * Limit how many BountyClawIdentities to update.
     */
    limit?: number
  }

  /**
   * BountyClawIdentity updateManyAndReturn
   */
  export type BountyClawIdentityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BountyClawIdentity
     */
    select?: BountyClawIdentitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BountyClawIdentity
     */
    omit?: BountyClawIdentityOmit<ExtArgs> | null
    /**
     * The data used to update BountyClawIdentities.
     */
    data: XOR<BountyClawIdentityUpdateManyMutationInput, BountyClawIdentityUncheckedUpdateManyInput>
    /**
     * Filter which BountyClawIdentities to update
     */
    where?: BountyClawIdentityWhereInput
    /**
     * Limit how many BountyClawIdentities to update.
     */
    limit?: number
  }

  /**
   * BountyClawIdentity upsert
   */
  export type BountyClawIdentityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BountyClawIdentity
     */
    select?: BountyClawIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BountyClawIdentity
     */
    omit?: BountyClawIdentityOmit<ExtArgs> | null
    /**
     * The filter to search for the BountyClawIdentity to update in case it exists.
     */
    where: BountyClawIdentityWhereUniqueInput
    /**
     * In case the BountyClawIdentity found by the `where` argument doesn't exist, create a new BountyClawIdentity with this data.
     */
    create: XOR<BountyClawIdentityCreateInput, BountyClawIdentityUncheckedCreateInput>
    /**
     * In case the BountyClawIdentity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BountyClawIdentityUpdateInput, BountyClawIdentityUncheckedUpdateInput>
  }

  /**
   * BountyClawIdentity delete
   */
  export type BountyClawIdentityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BountyClawIdentity
     */
    select?: BountyClawIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BountyClawIdentity
     */
    omit?: BountyClawIdentityOmit<ExtArgs> | null
    /**
     * Filter which BountyClawIdentity to delete.
     */
    where: BountyClawIdentityWhereUniqueInput
  }

  /**
   * BountyClawIdentity deleteMany
   */
  export type BountyClawIdentityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BountyClawIdentities to delete
     */
    where?: BountyClawIdentityWhereInput
    /**
     * Limit how many BountyClawIdentities to delete.
     */
    limit?: number
  }

  /**
   * BountyClawIdentity without action
   */
  export type BountyClawIdentityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BountyClawIdentity
     */
    select?: BountyClawIdentitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BountyClawIdentity
     */
    omit?: BountyClawIdentityOmit<ExtArgs> | null
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
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WalletScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    address: 'address',
    walletType: 'walletType',
    bountyId: 'bountyId',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum]


  export const SignatureScalarFieldEnum: {
    id: 'id',
    walletAddress: 'walletAddress',
    authorization: 'authorization',
    signedMessage: 'signedMessage',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    isActive: 'isActive'
  };

  export type SignatureScalarFieldEnum = (typeof SignatureScalarFieldEnum)[keyof typeof SignatureScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    bountyId: 'bountyId',
    fromAddress: 'fromAddress',
    toAddress: 'toAddress',
    amount: 'amount',
    currency: 'currency',
    txHash: 'txHash',
    status: 'status',
    type: 'type',
    errorMessage: 'errorMessage',
    createdAt: 'createdAt',
    confirmedAt: 'confirmedAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const BountyScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    rewardAmount: 'rewardAmount',
    currency: 'currency',
    hunterAddress: 'hunterAddress',
    status: 'status',
    proofUrl: 'proofUrl',
    proofCriteria: 'proofCriteria',
    escrowAddress: 'escrowAddress',
    creatorHashId: 'creatorHashId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    expiresAt: 'expiresAt'
  };

  export type BountyScalarFieldEnum = (typeof BountyScalarFieldEnum)[keyof typeof BountyScalarFieldEnum]


  export const RegistrationScalarFieldEnum: {
    id: 'id',
    bountyId: 'bountyId',
    hunterAddress: 'hunterAddress',
    status: 'status',
    proofUrl: 'proofUrl',
    verificationResult: 'verificationResult',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RegistrationScalarFieldEnum = (typeof RegistrationScalarFieldEnum)[keyof typeof RegistrationScalarFieldEnum]


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


  export const BountyClawIdentityScalarFieldEnum: {
    id: 'id',
    agentName: 'agentName',
    identityAddress: 'identityAddress',
    metadataUri: 'metadataUri',
    a2aEndpoint: 'a2aEndpoint',
    chainId: 'chainId',
    coordinatorUrl: 'coordinatorUrl',
    txHash: 'txHash',
    registeredAt: 'registeredAt',
    lastVerifiedAt: 'lastVerifiedAt',
    isActive: 'isActive'
  };

  export type BountyClawIdentityScalarFieldEnum = (typeof BountyClawIdentityScalarFieldEnum)[keyof typeof BountyClawIdentityScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'WalletType'
   */
  export type EnumWalletTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletType'>
    


  /**
   * Reference to a field of type 'WalletType[]'
   */
  export type ListEnumWalletTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'BountyStatus'
   */
  export type EnumBountyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BountyStatus'>
    


  /**
   * Reference to a field of type 'BountyStatus[]'
   */
  export type ListEnumBountyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BountyStatus[]'>
    


  /**
   * Reference to a field of type 'RegistrationStatus'
   */
  export type EnumRegistrationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RegistrationStatus'>
    


  /**
   * Reference to a field of type 'RegistrationStatus[]'
   */
  export type ListEnumRegistrationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RegistrationStatus[]'>
    


  /**
   * Reference to a field of type 'AuditLogStatus'
   */
  export type EnumAuditLogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditLogStatus'>
    


  /**
   * Reference to a field of type 'AuditLogStatus[]'
   */
  export type ListEnumAuditLogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditLogStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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
    createdAt?: DateTimeFilter<"User"> | Date | string
    bounties?: BountyListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    wallets?: WalletListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    hashedId?: SortOrder
    eoaAddress?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    bounties?: BountyOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
    wallets?: WalletOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    hashedId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    eoaAddress?: StringFilter<"User"> | string
    walletAddress?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    bounties?: BountyListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    wallets?: WalletListRelationFilter
  }, "hashedId">

  export type UserOrderByWithAggregationInput = {
    hashedId?: SortOrder
    eoaAddress?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
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
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type WalletWhereInput = {
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    id?: StringFilter<"Wallet"> | string
    userId?: StringNullableFilter<"Wallet"> | string | null
    address?: StringFilter<"Wallet"> | string
    walletType?: EnumWalletTypeFilter<"Wallet"> | $Enums.WalletType
    bountyId?: StringNullableFilter<"Wallet"> | string | null
    metadata?: JsonNullableFilter<"Wallet">
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    bounties?: BountyListRelationFilter
  }

  export type WalletOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    address?: SortOrder
    walletType?: SortOrder
    bountyId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    bounties?: BountyOrderByRelationAggregateInput
  }

  export type WalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    address?: string
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    userId?: StringNullableFilter<"Wallet"> | string | null
    walletType?: EnumWalletTypeFilter<"Wallet"> | $Enums.WalletType
    bountyId?: StringNullableFilter<"Wallet"> | string | null
    metadata?: JsonNullableFilter<"Wallet">
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    bounties?: BountyListRelationFilter
  }, "id" | "address">

  export type WalletOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    address?: SortOrder
    walletType?: SortOrder
    bountyId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WalletCountOrderByAggregateInput
    _max?: WalletMaxOrderByAggregateInput
    _min?: WalletMinOrderByAggregateInput
  }

  export type WalletScalarWhereWithAggregatesInput = {
    AND?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    OR?: WalletScalarWhereWithAggregatesInput[]
    NOT?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Wallet"> | string
    userId?: StringNullableWithAggregatesFilter<"Wallet"> | string | null
    address?: StringWithAggregatesFilter<"Wallet"> | string
    walletType?: EnumWalletTypeWithAggregatesFilter<"Wallet"> | $Enums.WalletType
    bountyId?: StringNullableWithAggregatesFilter<"Wallet"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Wallet">
    createdAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
  }

  export type SignatureWhereInput = {
    AND?: SignatureWhereInput | SignatureWhereInput[]
    OR?: SignatureWhereInput[]
    NOT?: SignatureWhereInput | SignatureWhereInput[]
    id?: StringFilter<"Signature"> | string
    walletAddress?: StringFilter<"Signature"> | string
    authorization?: StringFilter<"Signature"> | string
    signedMessage?: StringFilter<"Signature"> | string
    expiresAt?: DateTimeNullableFilter<"Signature"> | Date | string | null
    createdAt?: DateTimeFilter<"Signature"> | Date | string
    isActive?: BoolFilter<"Signature"> | boolean
  }

  export type SignatureOrderByWithRelationInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    authorization?: SortOrder
    signedMessage?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
  }

  export type SignatureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SignatureWhereInput | SignatureWhereInput[]
    OR?: SignatureWhereInput[]
    NOT?: SignatureWhereInput | SignatureWhereInput[]
    walletAddress?: StringFilter<"Signature"> | string
    authorization?: StringFilter<"Signature"> | string
    signedMessage?: StringFilter<"Signature"> | string
    expiresAt?: DateTimeNullableFilter<"Signature"> | Date | string | null
    createdAt?: DateTimeFilter<"Signature"> | Date | string
    isActive?: BoolFilter<"Signature"> | boolean
  }, "id">

  export type SignatureOrderByWithAggregationInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    authorization?: SortOrder
    signedMessage?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
    _count?: SignatureCountOrderByAggregateInput
    _max?: SignatureMaxOrderByAggregateInput
    _min?: SignatureMinOrderByAggregateInput
  }

  export type SignatureScalarWhereWithAggregatesInput = {
    AND?: SignatureScalarWhereWithAggregatesInput | SignatureScalarWhereWithAggregatesInput[]
    OR?: SignatureScalarWhereWithAggregatesInput[]
    NOT?: SignatureScalarWhereWithAggregatesInput | SignatureScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Signature"> | string
    walletAddress?: StringWithAggregatesFilter<"Signature"> | string
    authorization?: StringWithAggregatesFilter<"Signature"> | string
    signedMessage?: StringWithAggregatesFilter<"Signature"> | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Signature"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Signature"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Signature"> | boolean
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    bountyId?: StringNullableFilter<"Transaction"> | string | null
    fromAddress?: StringFilter<"Transaction"> | string
    toAddress?: StringFilter<"Transaction"> | string
    amount?: StringFilter<"Transaction"> | string
    currency?: StringFilter<"Transaction"> | string
    txHash?: StringNullableFilter<"Transaction"> | string | null
    status?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    errorMessage?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    confirmedAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    bountyId?: SortOrderInput | SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    txHash?: SortOrderInput | SortOrder
    status?: SortOrder
    type?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrderInput | SortOrder
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    bountyId?: StringNullableFilter<"Transaction"> | string | null
    fromAddress?: StringFilter<"Transaction"> | string
    toAddress?: StringFilter<"Transaction"> | string
    amount?: StringFilter<"Transaction"> | string
    currency?: StringFilter<"Transaction"> | string
    txHash?: StringNullableFilter<"Transaction"> | string | null
    status?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    errorMessage?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    confirmedAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    bountyId?: SortOrderInput | SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    txHash?: SortOrderInput | SortOrder
    status?: SortOrder
    type?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrderInput | SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    bountyId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    fromAddress?: StringWithAggregatesFilter<"Transaction"> | string
    toAddress?: StringWithAggregatesFilter<"Transaction"> | string
    amount?: StringWithAggregatesFilter<"Transaction"> | string
    currency?: StringWithAggregatesFilter<"Transaction"> | string
    txHash?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    status?: StringWithAggregatesFilter<"Transaction"> | string
    type?: StringWithAggregatesFilter<"Transaction"> | string
    errorMessage?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    confirmedAt?: DateTimeNullableWithAggregatesFilter<"Transaction"> | Date | string | null
  }

  export type BountyWhereInput = {
    AND?: BountyWhereInput | BountyWhereInput[]
    OR?: BountyWhereInput[]
    NOT?: BountyWhereInput | BountyWhereInput[]
    id?: StringFilter<"Bounty"> | string
    title?: StringFilter<"Bounty"> | string
    description?: StringFilter<"Bounty"> | string
    rewardAmount?: StringFilter<"Bounty"> | string
    currency?: StringFilter<"Bounty"> | string
    hunterAddress?: StringNullableFilter<"Bounty"> | string | null
    status?: EnumBountyStatusFilter<"Bounty"> | $Enums.BountyStatus
    proofUrl?: StringNullableFilter<"Bounty"> | string | null
    proofCriteria?: StringNullableFilter<"Bounty"> | string | null
    escrowAddress?: StringNullableFilter<"Bounty"> | string | null
    creatorHashId?: StringFilter<"Bounty"> | string
    createdAt?: DateTimeFilter<"Bounty"> | Date | string
    updatedAt?: DateTimeFilter<"Bounty"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Bounty"> | Date | string | null
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    registrations?: RegistrationListRelationFilter
    escrowWallet?: XOR<WalletNullableScalarRelationFilter, WalletWhereInput> | null
  }

  export type BountyOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    rewardAmount?: SortOrder
    currency?: SortOrder
    hunterAddress?: SortOrderInput | SortOrder
    status?: SortOrder
    proofUrl?: SortOrderInput | SortOrder
    proofCriteria?: SortOrderInput | SortOrder
    escrowAddress?: SortOrderInput | SortOrder
    creatorHashId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    creator?: UserOrderByWithRelationInput
    registrations?: RegistrationOrderByRelationAggregateInput
    escrowWallet?: WalletOrderByWithRelationInput
  }

  export type BountyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BountyWhereInput | BountyWhereInput[]
    OR?: BountyWhereInput[]
    NOT?: BountyWhereInput | BountyWhereInput[]
    title?: StringFilter<"Bounty"> | string
    description?: StringFilter<"Bounty"> | string
    rewardAmount?: StringFilter<"Bounty"> | string
    currency?: StringFilter<"Bounty"> | string
    hunterAddress?: StringNullableFilter<"Bounty"> | string | null
    status?: EnumBountyStatusFilter<"Bounty"> | $Enums.BountyStatus
    proofUrl?: StringNullableFilter<"Bounty"> | string | null
    proofCriteria?: StringNullableFilter<"Bounty"> | string | null
    escrowAddress?: StringNullableFilter<"Bounty"> | string | null
    creatorHashId?: StringFilter<"Bounty"> | string
    createdAt?: DateTimeFilter<"Bounty"> | Date | string
    updatedAt?: DateTimeFilter<"Bounty"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Bounty"> | Date | string | null
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    registrations?: RegistrationListRelationFilter
    escrowWallet?: XOR<WalletNullableScalarRelationFilter, WalletWhereInput> | null
  }, "id">

  export type BountyOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    rewardAmount?: SortOrder
    currency?: SortOrder
    hunterAddress?: SortOrderInput | SortOrder
    status?: SortOrder
    proofUrl?: SortOrderInput | SortOrder
    proofCriteria?: SortOrderInput | SortOrder
    escrowAddress?: SortOrderInput | SortOrder
    creatorHashId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    _count?: BountyCountOrderByAggregateInput
    _max?: BountyMaxOrderByAggregateInput
    _min?: BountyMinOrderByAggregateInput
  }

  export type BountyScalarWhereWithAggregatesInput = {
    AND?: BountyScalarWhereWithAggregatesInput | BountyScalarWhereWithAggregatesInput[]
    OR?: BountyScalarWhereWithAggregatesInput[]
    NOT?: BountyScalarWhereWithAggregatesInput | BountyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bounty"> | string
    title?: StringWithAggregatesFilter<"Bounty"> | string
    description?: StringWithAggregatesFilter<"Bounty"> | string
    rewardAmount?: StringWithAggregatesFilter<"Bounty"> | string
    currency?: StringWithAggregatesFilter<"Bounty"> | string
    hunterAddress?: StringNullableWithAggregatesFilter<"Bounty"> | string | null
    status?: EnumBountyStatusWithAggregatesFilter<"Bounty"> | $Enums.BountyStatus
    proofUrl?: StringNullableWithAggregatesFilter<"Bounty"> | string | null
    proofCriteria?: StringNullableWithAggregatesFilter<"Bounty"> | string | null
    escrowAddress?: StringNullableWithAggregatesFilter<"Bounty"> | string | null
    creatorHashId?: StringWithAggregatesFilter<"Bounty"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Bounty"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Bounty"> | Date | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Bounty"> | Date | string | null
  }

  export type RegistrationWhereInput = {
    AND?: RegistrationWhereInput | RegistrationWhereInput[]
    OR?: RegistrationWhereInput[]
    NOT?: RegistrationWhereInput | RegistrationWhereInput[]
    id?: StringFilter<"Registration"> | string
    bountyId?: StringFilter<"Registration"> | string
    hunterAddress?: StringFilter<"Registration"> | string
    status?: EnumRegistrationStatusFilter<"Registration"> | $Enums.RegistrationStatus
    proofUrl?: StringNullableFilter<"Registration"> | string | null
    verificationResult?: JsonNullableFilter<"Registration">
    createdAt?: DateTimeFilter<"Registration"> | Date | string
    updatedAt?: DateTimeFilter<"Registration"> | Date | string
    bounty?: XOR<BountyScalarRelationFilter, BountyWhereInput>
  }

  export type RegistrationOrderByWithRelationInput = {
    id?: SortOrder
    bountyId?: SortOrder
    hunterAddress?: SortOrder
    status?: SortOrder
    proofUrl?: SortOrderInput | SortOrder
    verificationResult?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bounty?: BountyOrderByWithRelationInput
  }

  export type RegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RegistrationWhereInput | RegistrationWhereInput[]
    OR?: RegistrationWhereInput[]
    NOT?: RegistrationWhereInput | RegistrationWhereInput[]
    bountyId?: StringFilter<"Registration"> | string
    hunterAddress?: StringFilter<"Registration"> | string
    status?: EnumRegistrationStatusFilter<"Registration"> | $Enums.RegistrationStatus
    proofUrl?: StringNullableFilter<"Registration"> | string | null
    verificationResult?: JsonNullableFilter<"Registration">
    createdAt?: DateTimeFilter<"Registration"> | Date | string
    updatedAt?: DateTimeFilter<"Registration"> | Date | string
    bounty?: XOR<BountyScalarRelationFilter, BountyWhereInput>
  }, "id">

  export type RegistrationOrderByWithAggregationInput = {
    id?: SortOrder
    bountyId?: SortOrder
    hunterAddress?: SortOrder
    status?: SortOrder
    proofUrl?: SortOrderInput | SortOrder
    verificationResult?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RegistrationCountOrderByAggregateInput
    _max?: RegistrationMaxOrderByAggregateInput
    _min?: RegistrationMinOrderByAggregateInput
  }

  export type RegistrationScalarWhereWithAggregatesInput = {
    AND?: RegistrationScalarWhereWithAggregatesInput | RegistrationScalarWhereWithAggregatesInput[]
    OR?: RegistrationScalarWhereWithAggregatesInput[]
    NOT?: RegistrationScalarWhereWithAggregatesInput | RegistrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Registration"> | string
    bountyId?: StringWithAggregatesFilter<"Registration"> | string
    hunterAddress?: StringWithAggregatesFilter<"Registration"> | string
    status?: EnumRegistrationStatusWithAggregatesFilter<"Registration"> | $Enums.RegistrationStatus
    proofUrl?: StringNullableWithAggregatesFilter<"Registration"> | string | null
    verificationResult?: JsonNullableWithAggregatesFilter<"Registration">
    createdAt?: DateTimeWithAggregatesFilter<"Registration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Registration"> | Date | string
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

  export type BountyClawIdentityWhereInput = {
    AND?: BountyClawIdentityWhereInput | BountyClawIdentityWhereInput[]
    OR?: BountyClawIdentityWhereInput[]
    NOT?: BountyClawIdentityWhereInput | BountyClawIdentityWhereInput[]
    id?: StringFilter<"BountyClawIdentity"> | string
    agentName?: StringFilter<"BountyClawIdentity"> | string
    identityAddress?: StringFilter<"BountyClawIdentity"> | string
    metadataUri?: StringFilter<"BountyClawIdentity"> | string
    a2aEndpoint?: StringFilter<"BountyClawIdentity"> | string
    chainId?: IntFilter<"BountyClawIdentity"> | number
    coordinatorUrl?: StringFilter<"BountyClawIdentity"> | string
    txHash?: StringNullableFilter<"BountyClawIdentity"> | string | null
    registeredAt?: DateTimeFilter<"BountyClawIdentity"> | Date | string
    lastVerifiedAt?: DateTimeFilter<"BountyClawIdentity"> | Date | string
    isActive?: BoolFilter<"BountyClawIdentity"> | boolean
  }

  export type BountyClawIdentityOrderByWithRelationInput = {
    id?: SortOrder
    agentName?: SortOrder
    identityAddress?: SortOrder
    metadataUri?: SortOrder
    a2aEndpoint?: SortOrder
    chainId?: SortOrder
    coordinatorUrl?: SortOrder
    txHash?: SortOrderInput | SortOrder
    registeredAt?: SortOrder
    lastVerifiedAt?: SortOrder
    isActive?: SortOrder
  }

  export type BountyClawIdentityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BountyClawIdentityWhereInput | BountyClawIdentityWhereInput[]
    OR?: BountyClawIdentityWhereInput[]
    NOT?: BountyClawIdentityWhereInput | BountyClawIdentityWhereInput[]
    agentName?: StringFilter<"BountyClawIdentity"> | string
    identityAddress?: StringFilter<"BountyClawIdentity"> | string
    metadataUri?: StringFilter<"BountyClawIdentity"> | string
    a2aEndpoint?: StringFilter<"BountyClawIdentity"> | string
    chainId?: IntFilter<"BountyClawIdentity"> | number
    coordinatorUrl?: StringFilter<"BountyClawIdentity"> | string
    txHash?: StringNullableFilter<"BountyClawIdentity"> | string | null
    registeredAt?: DateTimeFilter<"BountyClawIdentity"> | Date | string
    lastVerifiedAt?: DateTimeFilter<"BountyClawIdentity"> | Date | string
    isActive?: BoolFilter<"BountyClawIdentity"> | boolean
  }, "id">

  export type BountyClawIdentityOrderByWithAggregationInput = {
    id?: SortOrder
    agentName?: SortOrder
    identityAddress?: SortOrder
    metadataUri?: SortOrder
    a2aEndpoint?: SortOrder
    chainId?: SortOrder
    coordinatorUrl?: SortOrder
    txHash?: SortOrderInput | SortOrder
    registeredAt?: SortOrder
    lastVerifiedAt?: SortOrder
    isActive?: SortOrder
    _count?: BountyClawIdentityCountOrderByAggregateInput
    _avg?: BountyClawIdentityAvgOrderByAggregateInput
    _max?: BountyClawIdentityMaxOrderByAggregateInput
    _min?: BountyClawIdentityMinOrderByAggregateInput
    _sum?: BountyClawIdentitySumOrderByAggregateInput
  }

  export type BountyClawIdentityScalarWhereWithAggregatesInput = {
    AND?: BountyClawIdentityScalarWhereWithAggregatesInput | BountyClawIdentityScalarWhereWithAggregatesInput[]
    OR?: BountyClawIdentityScalarWhereWithAggregatesInput[]
    NOT?: BountyClawIdentityScalarWhereWithAggregatesInput | BountyClawIdentityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BountyClawIdentity"> | string
    agentName?: StringWithAggregatesFilter<"BountyClawIdentity"> | string
    identityAddress?: StringWithAggregatesFilter<"BountyClawIdentity"> | string
    metadataUri?: StringWithAggregatesFilter<"BountyClawIdentity"> | string
    a2aEndpoint?: StringWithAggregatesFilter<"BountyClawIdentity"> | string
    chainId?: IntWithAggregatesFilter<"BountyClawIdentity"> | number
    coordinatorUrl?: StringWithAggregatesFilter<"BountyClawIdentity"> | string
    txHash?: StringNullableWithAggregatesFilter<"BountyClawIdentity"> | string | null
    registeredAt?: DateTimeWithAggregatesFilter<"BountyClawIdentity"> | Date | string
    lastVerifiedAt?: DateTimeWithAggregatesFilter<"BountyClawIdentity"> | Date | string
    isActive?: BoolWithAggregatesFilter<"BountyClawIdentity"> | boolean
  }

  export type UserCreateInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    createdAt?: Date | string
    bounties?: BountyCreateNestedManyWithoutCreatorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    wallets?: WalletCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    createdAt?: Date | string
    bounties?: BountyUncheckedCreateNestedManyWithoutCreatorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bounties?: BountyUpdateManyWithoutCreatorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    wallets?: WalletUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bounties?: BountyUncheckedUpdateManyWithoutCreatorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletCreateInput = {
    id?: string
    address: string
    walletType: $Enums.WalletType
    bountyId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutWalletsInput
    bounties?: BountyCreateNestedManyWithoutEscrowWalletInput
  }

  export type WalletUncheckedCreateInput = {
    id?: string
    userId?: string | null
    address: string
    walletType: $Enums.WalletType
    bountyId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    bounties?: BountyUncheckedCreateNestedManyWithoutEscrowWalletInput
  }

  export type WalletUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    walletType?: EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType
    bountyId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutWalletsNestedInput
    bounties?: BountyUpdateManyWithoutEscrowWalletNestedInput
  }

  export type WalletUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    walletType?: EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType
    bountyId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bounties?: BountyUncheckedUpdateManyWithoutEscrowWalletNestedInput
  }

  export type WalletCreateManyInput = {
    id?: string
    userId?: string | null
    address: string
    walletType: $Enums.WalletType
    bountyId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    walletType?: EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType
    bountyId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    walletType?: EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType
    bountyId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignatureCreateInput = {
    id?: string
    walletAddress: string
    authorization: string
    signedMessage: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    isActive?: boolean
  }

  export type SignatureUncheckedCreateInput = {
    id?: string
    walletAddress: string
    authorization: string
    signedMessage: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    isActive?: boolean
  }

  export type SignatureUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    authorization?: StringFieldUpdateOperationsInput | string
    signedMessage?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SignatureUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    authorization?: StringFieldUpdateOperationsInput | string
    signedMessage?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SignatureCreateManyInput = {
    id?: string
    walletAddress: string
    authorization: string
    signedMessage: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    isActive?: boolean
  }

  export type SignatureUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    authorization?: StringFieldUpdateOperationsInput | string
    signedMessage?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SignatureUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    authorization?: StringFieldUpdateOperationsInput | string
    signedMessage?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TransactionCreateInput = {
    id?: string
    bountyId?: string | null
    fromAddress: string
    toAddress: string
    amount: string
    currency?: string
    txHash?: string | null
    status?: string
    type: string
    errorMessage?: string | null
    createdAt?: Date | string
    confirmedAt?: Date | string | null
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    bountyId?: string | null
    fromAddress: string
    toAddress: string
    amount: string
    currency?: string
    txHash?: string | null
    status?: string
    type: string
    errorMessage?: string | null
    createdAt?: Date | string
    confirmedAt?: Date | string | null
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bountyId?: NullableStringFieldUpdateOperationsInput | string | null
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bountyId?: NullableStringFieldUpdateOperationsInput | string | null
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionCreateManyInput = {
    id?: string
    bountyId?: string | null
    fromAddress: string
    toAddress: string
    amount: string
    currency?: string
    txHash?: string | null
    status?: string
    type: string
    errorMessage?: string | null
    createdAt?: Date | string
    confirmedAt?: Date | string | null
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bountyId?: NullableStringFieldUpdateOperationsInput | string | null
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bountyId?: NullableStringFieldUpdateOperationsInput | string | null
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BountyCreateInput = {
    id?: string
    title: string
    description: string
    rewardAmount: string
    currency?: string
    hunterAddress?: string | null
    status?: $Enums.BountyStatus
    proofUrl?: string | null
    proofCriteria?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt?: Date | string | null
    creator?: UserCreateNestedOneWithoutBountiesInput
    registrations?: RegistrationCreateNestedManyWithoutBountyInput
    escrowWallet?: WalletCreateNestedOneWithoutBountiesInput
  }

  export type BountyUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    rewardAmount: string
    currency?: string
    hunterAddress?: string | null
    status?: $Enums.BountyStatus
    proofUrl?: string | null
    proofCriteria?: string | null
    escrowAddress?: string | null
    creatorHashId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt?: Date | string | null
    registrations?: RegistrationUncheckedCreateNestedManyWithoutBountyInput
  }

  export type BountyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    rewardAmount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    hunterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBountyStatusFieldUpdateOperationsInput | $Enums.BountyStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofCriteria?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneWithoutBountiesNestedInput
    registrations?: RegistrationUpdateManyWithoutBountyNestedInput
    escrowWallet?: WalletUpdateOneWithoutBountiesNestedInput
  }

  export type BountyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    rewardAmount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    hunterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBountyStatusFieldUpdateOperationsInput | $Enums.BountyStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofCriteria?: NullableStringFieldUpdateOperationsInput | string | null
    escrowAddress?: NullableStringFieldUpdateOperationsInput | string | null
    creatorHashId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrations?: RegistrationUncheckedUpdateManyWithoutBountyNestedInput
  }

  export type BountyCreateManyInput = {
    id?: string
    title: string
    description: string
    rewardAmount: string
    currency?: string
    hunterAddress?: string | null
    status?: $Enums.BountyStatus
    proofUrl?: string | null
    proofCriteria?: string | null
    escrowAddress?: string | null
    creatorHashId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type BountyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    rewardAmount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    hunterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBountyStatusFieldUpdateOperationsInput | $Enums.BountyStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofCriteria?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BountyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    rewardAmount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    hunterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBountyStatusFieldUpdateOperationsInput | $Enums.BountyStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofCriteria?: NullableStringFieldUpdateOperationsInput | string | null
    escrowAddress?: NullableStringFieldUpdateOperationsInput | string | null
    creatorHashId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RegistrationCreateInput = {
    id?: string
    hunterAddress: string
    status?: $Enums.RegistrationStatus
    proofUrl?: string | null
    verificationResult?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    bounty: BountyCreateNestedOneWithoutRegistrationsInput
  }

  export type RegistrationUncheckedCreateInput = {
    id?: string
    bountyId: string
    hunterAddress: string
    status?: $Enums.RegistrationStatus
    proofUrl?: string | null
    verificationResult?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hunterAddress?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationResult?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bounty?: BountyUpdateOneRequiredWithoutRegistrationsNestedInput
  }

  export type RegistrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bountyId?: StringFieldUpdateOperationsInput | string
    hunterAddress?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationResult?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationCreateManyInput = {
    id?: string
    bountyId: string
    hunterAddress: string
    status?: $Enums.RegistrationStatus
    proofUrl?: string | null
    verificationResult?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    hunterAddress?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationResult?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bountyId?: StringFieldUpdateOperationsInput | string
    hunterAddress?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationResult?: NullableJsonNullValueInput | InputJsonValue
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

  export type BountyClawIdentityCreateInput = {
    id?: string
    agentName: string
    identityAddress: string
    metadataUri: string
    a2aEndpoint: string
    chainId: number
    coordinatorUrl: string
    txHash?: string | null
    registeredAt?: Date | string
    lastVerifiedAt?: Date | string
    isActive?: boolean
  }

  export type BountyClawIdentityUncheckedCreateInput = {
    id?: string
    agentName: string
    identityAddress: string
    metadataUri: string
    a2aEndpoint: string
    chainId: number
    coordinatorUrl: string
    txHash?: string | null
    registeredAt?: Date | string
    lastVerifiedAt?: Date | string
    isActive?: boolean
  }

  export type BountyClawIdentityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    metadataUri?: StringFieldUpdateOperationsInput | string
    a2aEndpoint?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    coordinatorUrl?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastVerifiedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BountyClawIdentityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    metadataUri?: StringFieldUpdateOperationsInput | string
    a2aEndpoint?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    coordinatorUrl?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastVerifiedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BountyClawIdentityCreateManyInput = {
    id?: string
    agentName: string
    identityAddress: string
    metadataUri: string
    a2aEndpoint: string
    chainId: number
    coordinatorUrl: string
    txHash?: string | null
    registeredAt?: Date | string
    lastVerifiedAt?: Date | string
    isActive?: boolean
  }

  export type BountyClawIdentityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    metadataUri?: StringFieldUpdateOperationsInput | string
    a2aEndpoint?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    coordinatorUrl?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastVerifiedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BountyClawIdentityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentName?: StringFieldUpdateOperationsInput | string
    identityAddress?: StringFieldUpdateOperationsInput | string
    metadataUri?: StringFieldUpdateOperationsInput | string
    a2aEndpoint?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    coordinatorUrl?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    registeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastVerifiedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
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

  export type BountyListRelationFilter = {
    every?: BountyWhereInput
    some?: BountyWhereInput
    none?: BountyWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type WalletListRelationFilter = {
    every?: WalletWhereInput
    some?: WalletWhereInput
    none?: WalletWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BountyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WalletOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    hashedId?: SortOrder
    eoaAddress?: SortOrder
    walletAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    hashedId?: SortOrder
    eoaAddress?: SortOrder
    walletAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    hashedId?: SortOrder
    eoaAddress?: SortOrder
    walletAddress?: SortOrder
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

  export type EnumWalletTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletType | EnumWalletTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WalletType[] | ListEnumWalletTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletType[] | ListEnumWalletTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletTypeFilter<$PrismaModel> | $Enums.WalletType
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

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type WalletCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    address?: SortOrder
    walletType?: SortOrder
    bountyId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    address?: SortOrder
    walletType?: SortOrder
    bountyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    address?: SortOrder
    walletType?: SortOrder
    bountyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumWalletTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletType | EnumWalletTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WalletType[] | ListEnumWalletTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletType[] | ListEnumWalletTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletTypeWithAggregatesFilter<$PrismaModel> | $Enums.WalletType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWalletTypeFilter<$PrismaModel>
    _max?: NestedEnumWalletTypeFilter<$PrismaModel>
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SignatureCountOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    authorization?: SortOrder
    signedMessage?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
  }

  export type SignatureMaxOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    authorization?: SortOrder
    signedMessage?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
  }

  export type SignatureMinOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    authorization?: SortOrder
    signedMessage?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    bountyId?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    txHash?: SortOrder
    status?: SortOrder
    type?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    bountyId?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    txHash?: SortOrder
    status?: SortOrder
    type?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    bountyId?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    txHash?: SortOrder
    status?: SortOrder
    type?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrder
  }

  export type EnumBountyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BountyStatus | EnumBountyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BountyStatus[] | ListEnumBountyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BountyStatus[] | ListEnumBountyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBountyStatusFilter<$PrismaModel> | $Enums.BountyStatus
  }

  export type RegistrationListRelationFilter = {
    every?: RegistrationWhereInput
    some?: RegistrationWhereInput
    none?: RegistrationWhereInput
  }

  export type WalletNullableScalarRelationFilter = {
    is?: WalletWhereInput | null
    isNot?: WalletWhereInput | null
  }

  export type RegistrationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BountyCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    rewardAmount?: SortOrder
    currency?: SortOrder
    hunterAddress?: SortOrder
    status?: SortOrder
    proofUrl?: SortOrder
    proofCriteria?: SortOrder
    escrowAddress?: SortOrder
    creatorHashId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type BountyMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    rewardAmount?: SortOrder
    currency?: SortOrder
    hunterAddress?: SortOrder
    status?: SortOrder
    proofUrl?: SortOrder
    proofCriteria?: SortOrder
    escrowAddress?: SortOrder
    creatorHashId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type BountyMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    rewardAmount?: SortOrder
    currency?: SortOrder
    hunterAddress?: SortOrder
    status?: SortOrder
    proofUrl?: SortOrder
    proofCriteria?: SortOrder
    escrowAddress?: SortOrder
    creatorHashId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type EnumBountyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BountyStatus | EnumBountyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BountyStatus[] | ListEnumBountyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BountyStatus[] | ListEnumBountyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBountyStatusWithAggregatesFilter<$PrismaModel> | $Enums.BountyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBountyStatusFilter<$PrismaModel>
    _max?: NestedEnumBountyStatusFilter<$PrismaModel>
  }

  export type EnumRegistrationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusFilter<$PrismaModel> | $Enums.RegistrationStatus
  }

  export type BountyScalarRelationFilter = {
    is?: BountyWhereInput
    isNot?: BountyWhereInput
  }

  export type RegistrationCountOrderByAggregateInput = {
    id?: SortOrder
    bountyId?: SortOrder
    hunterAddress?: SortOrder
    status?: SortOrder
    proofUrl?: SortOrder
    verificationResult?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegistrationMaxOrderByAggregateInput = {
    id?: SortOrder
    bountyId?: SortOrder
    hunterAddress?: SortOrder
    status?: SortOrder
    proofUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegistrationMinOrderByAggregateInput = {
    id?: SortOrder
    bountyId?: SortOrder
    hunterAddress?: SortOrder
    status?: SortOrder
    proofUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRegistrationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusWithAggregatesFilter<$PrismaModel> | $Enums.RegistrationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRegistrationStatusFilter<$PrismaModel>
    _max?: NestedEnumRegistrationStatusFilter<$PrismaModel>
  }

  export type EnumAuditLogStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditLogStatus | EnumAuditLogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AuditLogStatus[] | ListEnumAuditLogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditLogStatus[] | ListEnumAuditLogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditLogStatusFilter<$PrismaModel> | $Enums.AuditLogStatus
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

  export type BountyClawIdentityCountOrderByAggregateInput = {
    id?: SortOrder
    agentName?: SortOrder
    identityAddress?: SortOrder
    metadataUri?: SortOrder
    a2aEndpoint?: SortOrder
    chainId?: SortOrder
    coordinatorUrl?: SortOrder
    txHash?: SortOrder
    registeredAt?: SortOrder
    lastVerifiedAt?: SortOrder
    isActive?: SortOrder
  }

  export type BountyClawIdentityAvgOrderByAggregateInput = {
    chainId?: SortOrder
  }

  export type BountyClawIdentityMaxOrderByAggregateInput = {
    id?: SortOrder
    agentName?: SortOrder
    identityAddress?: SortOrder
    metadataUri?: SortOrder
    a2aEndpoint?: SortOrder
    chainId?: SortOrder
    coordinatorUrl?: SortOrder
    txHash?: SortOrder
    registeredAt?: SortOrder
    lastVerifiedAt?: SortOrder
    isActive?: SortOrder
  }

  export type BountyClawIdentityMinOrderByAggregateInput = {
    id?: SortOrder
    agentName?: SortOrder
    identityAddress?: SortOrder
    metadataUri?: SortOrder
    a2aEndpoint?: SortOrder
    chainId?: SortOrder
    coordinatorUrl?: SortOrder
    txHash?: SortOrder
    registeredAt?: SortOrder
    lastVerifiedAt?: SortOrder
    isActive?: SortOrder
  }

  export type BountyClawIdentitySumOrderByAggregateInput = {
    chainId?: SortOrder
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

  export type BountyCreateNestedManyWithoutCreatorInput = {
    create?: XOR<BountyCreateWithoutCreatorInput, BountyUncheckedCreateWithoutCreatorInput> | BountyCreateWithoutCreatorInput[] | BountyUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: BountyCreateOrConnectWithoutCreatorInput | BountyCreateOrConnectWithoutCreatorInput[]
    createMany?: BountyCreateManyCreatorInputEnvelope
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type WalletCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
  }

  export type BountyUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<BountyCreateWithoutCreatorInput, BountyUncheckedCreateWithoutCreatorInput> | BountyCreateWithoutCreatorInput[] | BountyUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: BountyCreateOrConnectWithoutCreatorInput | BountyCreateOrConnectWithoutCreatorInput[]
    createMany?: BountyCreateManyCreatorInputEnvelope
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type WalletUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BountyUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<BountyCreateWithoutCreatorInput, BountyUncheckedCreateWithoutCreatorInput> | BountyCreateWithoutCreatorInput[] | BountyUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: BountyCreateOrConnectWithoutCreatorInput | BountyCreateOrConnectWithoutCreatorInput[]
    upsert?: BountyUpsertWithWhereUniqueWithoutCreatorInput | BountyUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: BountyCreateManyCreatorInputEnvelope
    set?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    disconnect?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    delete?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    update?: BountyUpdateWithWhereUniqueWithoutCreatorInput | BountyUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: BountyUpdateManyWithWhereWithoutCreatorInput | BountyUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: BountyScalarWhereInput | BountyScalarWhereInput[]
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

  export type WalletUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    upsert?: WalletUpsertWithWhereUniqueWithoutUserInput | WalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    set?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    disconnect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    delete?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    update?: WalletUpdateWithWhereUniqueWithoutUserInput | WalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletUpdateManyWithWhereWithoutUserInput | WalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletScalarWhereInput | WalletScalarWhereInput[]
  }

  export type BountyUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<BountyCreateWithoutCreatorInput, BountyUncheckedCreateWithoutCreatorInput> | BountyCreateWithoutCreatorInput[] | BountyUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: BountyCreateOrConnectWithoutCreatorInput | BountyCreateOrConnectWithoutCreatorInput[]
    upsert?: BountyUpsertWithWhereUniqueWithoutCreatorInput | BountyUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: BountyCreateManyCreatorInputEnvelope
    set?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    disconnect?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    delete?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    update?: BountyUpdateWithWhereUniqueWithoutCreatorInput | BountyUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: BountyUpdateManyWithWhereWithoutCreatorInput | BountyUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: BountyScalarWhereInput | BountyScalarWhereInput[]
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

  export type WalletUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    upsert?: WalletUpsertWithWhereUniqueWithoutUserInput | WalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    set?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    disconnect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    delete?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    update?: WalletUpdateWithWhereUniqueWithoutUserInput | WalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletUpdateManyWithWhereWithoutUserInput | WalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletScalarWhereInput | WalletScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutWalletsInput = {
    create?: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletsInput
    connect?: UserWhereUniqueInput
  }

  export type BountyCreateNestedManyWithoutEscrowWalletInput = {
    create?: XOR<BountyCreateWithoutEscrowWalletInput, BountyUncheckedCreateWithoutEscrowWalletInput> | BountyCreateWithoutEscrowWalletInput[] | BountyUncheckedCreateWithoutEscrowWalletInput[]
    connectOrCreate?: BountyCreateOrConnectWithoutEscrowWalletInput | BountyCreateOrConnectWithoutEscrowWalletInput[]
    createMany?: BountyCreateManyEscrowWalletInputEnvelope
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
  }

  export type BountyUncheckedCreateNestedManyWithoutEscrowWalletInput = {
    create?: XOR<BountyCreateWithoutEscrowWalletInput, BountyUncheckedCreateWithoutEscrowWalletInput> | BountyCreateWithoutEscrowWalletInput[] | BountyUncheckedCreateWithoutEscrowWalletInput[]
    connectOrCreate?: BountyCreateOrConnectWithoutEscrowWalletInput | BountyCreateOrConnectWithoutEscrowWalletInput[]
    createMany?: BountyCreateManyEscrowWalletInputEnvelope
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
  }

  export type EnumWalletTypeFieldUpdateOperationsInput = {
    set?: $Enums.WalletType
  }

  export type UserUpdateOneWithoutWalletsNestedInput = {
    create?: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletsInput
    upsert?: UserUpsertWithoutWalletsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWalletsInput, UserUpdateWithoutWalletsInput>, UserUncheckedUpdateWithoutWalletsInput>
  }

  export type BountyUpdateManyWithoutEscrowWalletNestedInput = {
    create?: XOR<BountyCreateWithoutEscrowWalletInput, BountyUncheckedCreateWithoutEscrowWalletInput> | BountyCreateWithoutEscrowWalletInput[] | BountyUncheckedCreateWithoutEscrowWalletInput[]
    connectOrCreate?: BountyCreateOrConnectWithoutEscrowWalletInput | BountyCreateOrConnectWithoutEscrowWalletInput[]
    upsert?: BountyUpsertWithWhereUniqueWithoutEscrowWalletInput | BountyUpsertWithWhereUniqueWithoutEscrowWalletInput[]
    createMany?: BountyCreateManyEscrowWalletInputEnvelope
    set?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    disconnect?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    delete?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    update?: BountyUpdateWithWhereUniqueWithoutEscrowWalletInput | BountyUpdateWithWhereUniqueWithoutEscrowWalletInput[]
    updateMany?: BountyUpdateManyWithWhereWithoutEscrowWalletInput | BountyUpdateManyWithWhereWithoutEscrowWalletInput[]
    deleteMany?: BountyScalarWhereInput | BountyScalarWhereInput[]
  }

  export type BountyUncheckedUpdateManyWithoutEscrowWalletNestedInput = {
    create?: XOR<BountyCreateWithoutEscrowWalletInput, BountyUncheckedCreateWithoutEscrowWalletInput> | BountyCreateWithoutEscrowWalletInput[] | BountyUncheckedCreateWithoutEscrowWalletInput[]
    connectOrCreate?: BountyCreateOrConnectWithoutEscrowWalletInput | BountyCreateOrConnectWithoutEscrowWalletInput[]
    upsert?: BountyUpsertWithWhereUniqueWithoutEscrowWalletInput | BountyUpsertWithWhereUniqueWithoutEscrowWalletInput[]
    createMany?: BountyCreateManyEscrowWalletInputEnvelope
    set?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    disconnect?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    delete?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[]
    update?: BountyUpdateWithWhereUniqueWithoutEscrowWalletInput | BountyUpdateWithWhereUniqueWithoutEscrowWalletInput[]
    updateMany?: BountyUpdateManyWithWhereWithoutEscrowWalletInput | BountyUpdateManyWithWhereWithoutEscrowWalletInput[]
    deleteMany?: BountyScalarWhereInput | BountyScalarWhereInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserCreateNestedOneWithoutBountiesInput = {
    create?: XOR<UserCreateWithoutBountiesInput, UserUncheckedCreateWithoutBountiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutBountiesInput
    connect?: UserWhereUniqueInput
  }

  export type RegistrationCreateNestedManyWithoutBountyInput = {
    create?: XOR<RegistrationCreateWithoutBountyInput, RegistrationUncheckedCreateWithoutBountyInput> | RegistrationCreateWithoutBountyInput[] | RegistrationUncheckedCreateWithoutBountyInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutBountyInput | RegistrationCreateOrConnectWithoutBountyInput[]
    createMany?: RegistrationCreateManyBountyInputEnvelope
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
  }

  export type WalletCreateNestedOneWithoutBountiesInput = {
    create?: XOR<WalletCreateWithoutBountiesInput, WalletUncheckedCreateWithoutBountiesInput>
    connectOrCreate?: WalletCreateOrConnectWithoutBountiesInput
    connect?: WalletWhereUniqueInput
  }

  export type RegistrationUncheckedCreateNestedManyWithoutBountyInput = {
    create?: XOR<RegistrationCreateWithoutBountyInput, RegistrationUncheckedCreateWithoutBountyInput> | RegistrationCreateWithoutBountyInput[] | RegistrationUncheckedCreateWithoutBountyInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutBountyInput | RegistrationCreateOrConnectWithoutBountyInput[]
    createMany?: RegistrationCreateManyBountyInputEnvelope
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
  }

  export type EnumBountyStatusFieldUpdateOperationsInput = {
    set?: $Enums.BountyStatus
  }

  export type UserUpdateOneWithoutBountiesNestedInput = {
    create?: XOR<UserCreateWithoutBountiesInput, UserUncheckedCreateWithoutBountiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutBountiesInput
    upsert?: UserUpsertWithoutBountiesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBountiesInput, UserUpdateWithoutBountiesInput>, UserUncheckedUpdateWithoutBountiesInput>
  }

  export type RegistrationUpdateManyWithoutBountyNestedInput = {
    create?: XOR<RegistrationCreateWithoutBountyInput, RegistrationUncheckedCreateWithoutBountyInput> | RegistrationCreateWithoutBountyInput[] | RegistrationUncheckedCreateWithoutBountyInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutBountyInput | RegistrationCreateOrConnectWithoutBountyInput[]
    upsert?: RegistrationUpsertWithWhereUniqueWithoutBountyInput | RegistrationUpsertWithWhereUniqueWithoutBountyInput[]
    createMany?: RegistrationCreateManyBountyInputEnvelope
    set?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    disconnect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    delete?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    update?: RegistrationUpdateWithWhereUniqueWithoutBountyInput | RegistrationUpdateWithWhereUniqueWithoutBountyInput[]
    updateMany?: RegistrationUpdateManyWithWhereWithoutBountyInput | RegistrationUpdateManyWithWhereWithoutBountyInput[]
    deleteMany?: RegistrationScalarWhereInput | RegistrationScalarWhereInput[]
  }

  export type WalletUpdateOneWithoutBountiesNestedInput = {
    create?: XOR<WalletCreateWithoutBountiesInput, WalletUncheckedCreateWithoutBountiesInput>
    connectOrCreate?: WalletCreateOrConnectWithoutBountiesInput
    upsert?: WalletUpsertWithoutBountiesInput
    disconnect?: WalletWhereInput | boolean
    delete?: WalletWhereInput | boolean
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutBountiesInput, WalletUpdateWithoutBountiesInput>, WalletUncheckedUpdateWithoutBountiesInput>
  }

  export type RegistrationUncheckedUpdateManyWithoutBountyNestedInput = {
    create?: XOR<RegistrationCreateWithoutBountyInput, RegistrationUncheckedCreateWithoutBountyInput> | RegistrationCreateWithoutBountyInput[] | RegistrationUncheckedCreateWithoutBountyInput[]
    connectOrCreate?: RegistrationCreateOrConnectWithoutBountyInput | RegistrationCreateOrConnectWithoutBountyInput[]
    upsert?: RegistrationUpsertWithWhereUniqueWithoutBountyInput | RegistrationUpsertWithWhereUniqueWithoutBountyInput[]
    createMany?: RegistrationCreateManyBountyInputEnvelope
    set?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    disconnect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    delete?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    connect?: RegistrationWhereUniqueInput | RegistrationWhereUniqueInput[]
    update?: RegistrationUpdateWithWhereUniqueWithoutBountyInput | RegistrationUpdateWithWhereUniqueWithoutBountyInput[]
    updateMany?: RegistrationUpdateManyWithWhereWithoutBountyInput | RegistrationUpdateManyWithWhereWithoutBountyInput[]
    deleteMany?: RegistrationScalarWhereInput | RegistrationScalarWhereInput[]
  }

  export type BountyCreateNestedOneWithoutRegistrationsInput = {
    create?: XOR<BountyCreateWithoutRegistrationsInput, BountyUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: BountyCreateOrConnectWithoutRegistrationsInput
    connect?: BountyWhereUniqueInput
  }

  export type EnumRegistrationStatusFieldUpdateOperationsInput = {
    set?: $Enums.RegistrationStatus
  }

  export type BountyUpdateOneRequiredWithoutRegistrationsNestedInput = {
    create?: XOR<BountyCreateWithoutRegistrationsInput, BountyUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: BountyCreateOrConnectWithoutRegistrationsInput
    upsert?: BountyUpsertWithoutRegistrationsInput
    connect?: BountyWhereUniqueInput
    update?: XOR<XOR<BountyUpdateToOneWithWhereWithoutRegistrationsInput, BountyUpdateWithoutRegistrationsInput>, BountyUncheckedUpdateWithoutRegistrationsInput>
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

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type NestedEnumWalletTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletType | EnumWalletTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WalletType[] | ListEnumWalletTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletType[] | ListEnumWalletTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletTypeFilter<$PrismaModel> | $Enums.WalletType
  }

  export type NestedEnumWalletTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletType | EnumWalletTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WalletType[] | ListEnumWalletTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletType[] | ListEnumWalletTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletTypeWithAggregatesFilter<$PrismaModel> | $Enums.WalletType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWalletTypeFilter<$PrismaModel>
    _max?: NestedEnumWalletTypeFilter<$PrismaModel>
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumBountyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BountyStatus | EnumBountyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BountyStatus[] | ListEnumBountyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BountyStatus[] | ListEnumBountyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBountyStatusFilter<$PrismaModel> | $Enums.BountyStatus
  }

  export type NestedEnumBountyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BountyStatus | EnumBountyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BountyStatus[] | ListEnumBountyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BountyStatus[] | ListEnumBountyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBountyStatusWithAggregatesFilter<$PrismaModel> | $Enums.BountyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBountyStatusFilter<$PrismaModel>
    _max?: NestedEnumBountyStatusFilter<$PrismaModel>
  }

  export type NestedEnumRegistrationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusFilter<$PrismaModel> | $Enums.RegistrationStatus
  }

  export type NestedEnumRegistrationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusWithAggregatesFilter<$PrismaModel> | $Enums.RegistrationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRegistrationStatusFilter<$PrismaModel>
    _max?: NestedEnumRegistrationStatusFilter<$PrismaModel>
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

  export type BountyCreateWithoutCreatorInput = {
    id?: string
    title: string
    description: string
    rewardAmount: string
    currency?: string
    hunterAddress?: string | null
    status?: $Enums.BountyStatus
    proofUrl?: string | null
    proofCriteria?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt?: Date | string | null
    registrations?: RegistrationCreateNestedManyWithoutBountyInput
    escrowWallet?: WalletCreateNestedOneWithoutBountiesInput
  }

  export type BountyUncheckedCreateWithoutCreatorInput = {
    id?: string
    title: string
    description: string
    rewardAmount: string
    currency?: string
    hunterAddress?: string | null
    status?: $Enums.BountyStatus
    proofUrl?: string | null
    proofCriteria?: string | null
    escrowAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt?: Date | string | null
    registrations?: RegistrationUncheckedCreateNestedManyWithoutBountyInput
  }

  export type BountyCreateOrConnectWithoutCreatorInput = {
    where: BountyWhereUniqueInput
    create: XOR<BountyCreateWithoutCreatorInput, BountyUncheckedCreateWithoutCreatorInput>
  }

  export type BountyCreateManyCreatorInputEnvelope = {
    data: BountyCreateManyCreatorInput | BountyCreateManyCreatorInput[]
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

  export type WalletCreateWithoutUserInput = {
    id?: string
    address: string
    walletType: $Enums.WalletType
    bountyId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    bounties?: BountyCreateNestedManyWithoutEscrowWalletInput
  }

  export type WalletUncheckedCreateWithoutUserInput = {
    id?: string
    address: string
    walletType: $Enums.WalletType
    bountyId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    bounties?: BountyUncheckedCreateNestedManyWithoutEscrowWalletInput
  }

  export type WalletCreateOrConnectWithoutUserInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type WalletCreateManyUserInputEnvelope = {
    data: WalletCreateManyUserInput | WalletCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BountyUpsertWithWhereUniqueWithoutCreatorInput = {
    where: BountyWhereUniqueInput
    update: XOR<BountyUpdateWithoutCreatorInput, BountyUncheckedUpdateWithoutCreatorInput>
    create: XOR<BountyCreateWithoutCreatorInput, BountyUncheckedCreateWithoutCreatorInput>
  }

  export type BountyUpdateWithWhereUniqueWithoutCreatorInput = {
    where: BountyWhereUniqueInput
    data: XOR<BountyUpdateWithoutCreatorInput, BountyUncheckedUpdateWithoutCreatorInput>
  }

  export type BountyUpdateManyWithWhereWithoutCreatorInput = {
    where: BountyScalarWhereInput
    data: XOR<BountyUpdateManyMutationInput, BountyUncheckedUpdateManyWithoutCreatorInput>
  }

  export type BountyScalarWhereInput = {
    AND?: BountyScalarWhereInput | BountyScalarWhereInput[]
    OR?: BountyScalarWhereInput[]
    NOT?: BountyScalarWhereInput | BountyScalarWhereInput[]
    id?: StringFilter<"Bounty"> | string
    title?: StringFilter<"Bounty"> | string
    description?: StringFilter<"Bounty"> | string
    rewardAmount?: StringFilter<"Bounty"> | string
    currency?: StringFilter<"Bounty"> | string
    hunterAddress?: StringNullableFilter<"Bounty"> | string | null
    status?: EnumBountyStatusFilter<"Bounty"> | $Enums.BountyStatus
    proofUrl?: StringNullableFilter<"Bounty"> | string | null
    proofCriteria?: StringNullableFilter<"Bounty"> | string | null
    escrowAddress?: StringNullableFilter<"Bounty"> | string | null
    creatorHashId?: StringFilter<"Bounty"> | string
    createdAt?: DateTimeFilter<"Bounty"> | Date | string
    updatedAt?: DateTimeFilter<"Bounty"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Bounty"> | Date | string | null
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

  export type WalletUpsertWithWhereUniqueWithoutUserInput = {
    where: WalletWhereUniqueInput
    update: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type WalletUpdateWithWhereUniqueWithoutUserInput = {
    where: WalletWhereUniqueInput
    data: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
  }

  export type WalletUpdateManyWithWhereWithoutUserInput = {
    where: WalletScalarWhereInput
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyWithoutUserInput>
  }

  export type WalletScalarWhereInput = {
    AND?: WalletScalarWhereInput | WalletScalarWhereInput[]
    OR?: WalletScalarWhereInput[]
    NOT?: WalletScalarWhereInput | WalletScalarWhereInput[]
    id?: StringFilter<"Wallet"> | string
    userId?: StringNullableFilter<"Wallet"> | string | null
    address?: StringFilter<"Wallet"> | string
    walletType?: EnumWalletTypeFilter<"Wallet"> | $Enums.WalletType
    bountyId?: StringNullableFilter<"Wallet"> | string | null
    metadata?: JsonNullableFilter<"Wallet">
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
  }

  export type UserCreateWithoutWalletsInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    createdAt?: Date | string
    bounties?: BountyCreateNestedManyWithoutCreatorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWalletsInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    createdAt?: Date | string
    bounties?: BountyUncheckedCreateNestedManyWithoutCreatorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWalletsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
  }

  export type BountyCreateWithoutEscrowWalletInput = {
    id?: string
    title: string
    description: string
    rewardAmount: string
    currency?: string
    hunterAddress?: string | null
    status?: $Enums.BountyStatus
    proofUrl?: string | null
    proofCriteria?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt?: Date | string | null
    creator?: UserCreateNestedOneWithoutBountiesInput
    registrations?: RegistrationCreateNestedManyWithoutBountyInput
  }

  export type BountyUncheckedCreateWithoutEscrowWalletInput = {
    id?: string
    title: string
    description: string
    rewardAmount: string
    currency?: string
    hunterAddress?: string | null
    status?: $Enums.BountyStatus
    proofUrl?: string | null
    proofCriteria?: string | null
    creatorHashId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt?: Date | string | null
    registrations?: RegistrationUncheckedCreateNestedManyWithoutBountyInput
  }

  export type BountyCreateOrConnectWithoutEscrowWalletInput = {
    where: BountyWhereUniqueInput
    create: XOR<BountyCreateWithoutEscrowWalletInput, BountyUncheckedCreateWithoutEscrowWalletInput>
  }

  export type BountyCreateManyEscrowWalletInputEnvelope = {
    data: BountyCreateManyEscrowWalletInput | BountyCreateManyEscrowWalletInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWalletsInput = {
    update: XOR<UserUpdateWithoutWalletsInput, UserUncheckedUpdateWithoutWalletsInput>
    create: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWalletsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWalletsInput, UserUncheckedUpdateWithoutWalletsInput>
  }

  export type UserUpdateWithoutWalletsInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bounties?: BountyUpdateManyWithoutCreatorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWalletsInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bounties?: BountyUncheckedUpdateManyWithoutCreatorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BountyUpsertWithWhereUniqueWithoutEscrowWalletInput = {
    where: BountyWhereUniqueInput
    update: XOR<BountyUpdateWithoutEscrowWalletInput, BountyUncheckedUpdateWithoutEscrowWalletInput>
    create: XOR<BountyCreateWithoutEscrowWalletInput, BountyUncheckedCreateWithoutEscrowWalletInput>
  }

  export type BountyUpdateWithWhereUniqueWithoutEscrowWalletInput = {
    where: BountyWhereUniqueInput
    data: XOR<BountyUpdateWithoutEscrowWalletInput, BountyUncheckedUpdateWithoutEscrowWalletInput>
  }

  export type BountyUpdateManyWithWhereWithoutEscrowWalletInput = {
    where: BountyScalarWhereInput
    data: XOR<BountyUpdateManyMutationInput, BountyUncheckedUpdateManyWithoutEscrowWalletInput>
  }

  export type UserCreateWithoutBountiesInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    createdAt?: Date | string
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    wallets?: WalletCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBountiesInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    createdAt?: Date | string
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBountiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBountiesInput, UserUncheckedCreateWithoutBountiesInput>
  }

  export type RegistrationCreateWithoutBountyInput = {
    id?: string
    hunterAddress: string
    status?: $Enums.RegistrationStatus
    proofUrl?: string | null
    verificationResult?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrationUncheckedCreateWithoutBountyInput = {
    id?: string
    hunterAddress: string
    status?: $Enums.RegistrationStatus
    proofUrl?: string | null
    verificationResult?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrationCreateOrConnectWithoutBountyInput = {
    where: RegistrationWhereUniqueInput
    create: XOR<RegistrationCreateWithoutBountyInput, RegistrationUncheckedCreateWithoutBountyInput>
  }

  export type RegistrationCreateManyBountyInputEnvelope = {
    data: RegistrationCreateManyBountyInput | RegistrationCreateManyBountyInput[]
    skipDuplicates?: boolean
  }

  export type WalletCreateWithoutBountiesInput = {
    id?: string
    address: string
    walletType: $Enums.WalletType
    bountyId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutWalletsInput
  }

  export type WalletUncheckedCreateWithoutBountiesInput = {
    id?: string
    userId?: string | null
    address: string
    walletType: $Enums.WalletType
    bountyId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletCreateOrConnectWithoutBountiesInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutBountiesInput, WalletUncheckedCreateWithoutBountiesInput>
  }

  export type UserUpsertWithoutBountiesInput = {
    update: XOR<UserUpdateWithoutBountiesInput, UserUncheckedUpdateWithoutBountiesInput>
    create: XOR<UserCreateWithoutBountiesInput, UserUncheckedCreateWithoutBountiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBountiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBountiesInput, UserUncheckedUpdateWithoutBountiesInput>
  }

  export type UserUpdateWithoutBountiesInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    wallets?: WalletUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBountiesInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RegistrationUpsertWithWhereUniqueWithoutBountyInput = {
    where: RegistrationWhereUniqueInput
    update: XOR<RegistrationUpdateWithoutBountyInput, RegistrationUncheckedUpdateWithoutBountyInput>
    create: XOR<RegistrationCreateWithoutBountyInput, RegistrationUncheckedCreateWithoutBountyInput>
  }

  export type RegistrationUpdateWithWhereUniqueWithoutBountyInput = {
    where: RegistrationWhereUniqueInput
    data: XOR<RegistrationUpdateWithoutBountyInput, RegistrationUncheckedUpdateWithoutBountyInput>
  }

  export type RegistrationUpdateManyWithWhereWithoutBountyInput = {
    where: RegistrationScalarWhereInput
    data: XOR<RegistrationUpdateManyMutationInput, RegistrationUncheckedUpdateManyWithoutBountyInput>
  }

  export type RegistrationScalarWhereInput = {
    AND?: RegistrationScalarWhereInput | RegistrationScalarWhereInput[]
    OR?: RegistrationScalarWhereInput[]
    NOT?: RegistrationScalarWhereInput | RegistrationScalarWhereInput[]
    id?: StringFilter<"Registration"> | string
    bountyId?: StringFilter<"Registration"> | string
    hunterAddress?: StringFilter<"Registration"> | string
    status?: EnumRegistrationStatusFilter<"Registration"> | $Enums.RegistrationStatus
    proofUrl?: StringNullableFilter<"Registration"> | string | null
    verificationResult?: JsonNullableFilter<"Registration">
    createdAt?: DateTimeFilter<"Registration"> | Date | string
    updatedAt?: DateTimeFilter<"Registration"> | Date | string
  }

  export type WalletUpsertWithoutBountiesInput = {
    update: XOR<WalletUpdateWithoutBountiesInput, WalletUncheckedUpdateWithoutBountiesInput>
    create: XOR<WalletCreateWithoutBountiesInput, WalletUncheckedCreateWithoutBountiesInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutBountiesInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutBountiesInput, WalletUncheckedUpdateWithoutBountiesInput>
  }

  export type WalletUpdateWithoutBountiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    walletType?: EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType
    bountyId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutWalletsNestedInput
  }

  export type WalletUncheckedUpdateWithoutBountiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    walletType?: EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType
    bountyId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BountyCreateWithoutRegistrationsInput = {
    id?: string
    title: string
    description: string
    rewardAmount: string
    currency?: string
    hunterAddress?: string | null
    status?: $Enums.BountyStatus
    proofUrl?: string | null
    proofCriteria?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt?: Date | string | null
    creator?: UserCreateNestedOneWithoutBountiesInput
    escrowWallet?: WalletCreateNestedOneWithoutBountiesInput
  }

  export type BountyUncheckedCreateWithoutRegistrationsInput = {
    id?: string
    title: string
    description: string
    rewardAmount: string
    currency?: string
    hunterAddress?: string | null
    status?: $Enums.BountyStatus
    proofUrl?: string | null
    proofCriteria?: string | null
    escrowAddress?: string | null
    creatorHashId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type BountyCreateOrConnectWithoutRegistrationsInput = {
    where: BountyWhereUniqueInput
    create: XOR<BountyCreateWithoutRegistrationsInput, BountyUncheckedCreateWithoutRegistrationsInput>
  }

  export type BountyUpsertWithoutRegistrationsInput = {
    update: XOR<BountyUpdateWithoutRegistrationsInput, BountyUncheckedUpdateWithoutRegistrationsInput>
    create: XOR<BountyCreateWithoutRegistrationsInput, BountyUncheckedCreateWithoutRegistrationsInput>
    where?: BountyWhereInput
  }

  export type BountyUpdateToOneWithWhereWithoutRegistrationsInput = {
    where?: BountyWhereInput
    data: XOR<BountyUpdateWithoutRegistrationsInput, BountyUncheckedUpdateWithoutRegistrationsInput>
  }

  export type BountyUpdateWithoutRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    rewardAmount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    hunterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBountyStatusFieldUpdateOperationsInput | $Enums.BountyStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofCriteria?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneWithoutBountiesNestedInput
    escrowWallet?: WalletUpdateOneWithoutBountiesNestedInput
  }

  export type BountyUncheckedUpdateWithoutRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    rewardAmount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    hunterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBountyStatusFieldUpdateOperationsInput | $Enums.BountyStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofCriteria?: NullableStringFieldUpdateOperationsInput | string | null
    escrowAddress?: NullableStringFieldUpdateOperationsInput | string | null
    creatorHashId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateWithoutAuditLogsInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    createdAt?: Date | string
    bounties?: BountyCreateNestedManyWithoutCreatorInput
    wallets?: WalletCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    hashedId: string
    eoaAddress: string
    walletAddress?: string | null
    createdAt?: Date | string
    bounties?: BountyUncheckedCreateNestedManyWithoutCreatorInput
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
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
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bounties?: BountyUpdateManyWithoutCreatorNestedInput
    wallets?: WalletUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    hashedId?: StringFieldUpdateOperationsInput | string
    eoaAddress?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bounties?: BountyUncheckedUpdateManyWithoutCreatorNestedInput
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BountyCreateManyCreatorInput = {
    id?: string
    title: string
    description: string
    rewardAmount: string
    currency?: string
    hunterAddress?: string | null
    status?: $Enums.BountyStatus
    proofUrl?: string | null
    proofCriteria?: string | null
    escrowAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt?: Date | string | null
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

  export type WalletCreateManyUserInput = {
    id?: string
    address: string
    walletType: $Enums.WalletType
    bountyId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BountyUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    rewardAmount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    hunterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBountyStatusFieldUpdateOperationsInput | $Enums.BountyStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofCriteria?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrations?: RegistrationUpdateManyWithoutBountyNestedInput
    escrowWallet?: WalletUpdateOneWithoutBountiesNestedInput
  }

  export type BountyUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    rewardAmount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    hunterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBountyStatusFieldUpdateOperationsInput | $Enums.BountyStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofCriteria?: NullableStringFieldUpdateOperationsInput | string | null
    escrowAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrations?: RegistrationUncheckedUpdateManyWithoutBountyNestedInput
  }

  export type BountyUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    rewardAmount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    hunterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBountyStatusFieldUpdateOperationsInput | $Enums.BountyStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofCriteria?: NullableStringFieldUpdateOperationsInput | string | null
    escrowAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type WalletUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    walletType?: EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType
    bountyId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bounties?: BountyUpdateManyWithoutEscrowWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    walletType?: EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType
    bountyId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bounties?: BountyUncheckedUpdateManyWithoutEscrowWalletNestedInput
  }

  export type WalletUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    walletType?: EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType
    bountyId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BountyCreateManyEscrowWalletInput = {
    id?: string
    title: string
    description: string
    rewardAmount: string
    currency?: string
    hunterAddress?: string | null
    status?: $Enums.BountyStatus
    proofUrl?: string | null
    proofCriteria?: string | null
    creatorHashId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type BountyUpdateWithoutEscrowWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    rewardAmount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    hunterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBountyStatusFieldUpdateOperationsInput | $Enums.BountyStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofCriteria?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creator?: UserUpdateOneWithoutBountiesNestedInput
    registrations?: RegistrationUpdateManyWithoutBountyNestedInput
  }

  export type BountyUncheckedUpdateWithoutEscrowWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    rewardAmount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    hunterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBountyStatusFieldUpdateOperationsInput | $Enums.BountyStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofCriteria?: NullableStringFieldUpdateOperationsInput | string | null
    creatorHashId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrations?: RegistrationUncheckedUpdateManyWithoutBountyNestedInput
  }

  export type BountyUncheckedUpdateManyWithoutEscrowWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    rewardAmount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    hunterAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBountyStatusFieldUpdateOperationsInput | $Enums.BountyStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofCriteria?: NullableStringFieldUpdateOperationsInput | string | null
    creatorHashId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RegistrationCreateManyBountyInput = {
    id?: string
    hunterAddress: string
    status?: $Enums.RegistrationStatus
    proofUrl?: string | null
    verificationResult?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegistrationUpdateWithoutBountyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hunterAddress?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationResult?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationUncheckedUpdateWithoutBountyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hunterAddress?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationResult?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationUncheckedUpdateManyWithoutBountyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hunterAddress?: StringFieldUpdateOperationsInput | string
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    proofUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationResult?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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