import * as CONST from '../constants';
import { hyphenate, isPlainObject } from '../utils';
import { OptionProps } from '../contracts';

export class Option implements OptionProps {
  get name() {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  private _name: string;

  get value() {
    return this._value;
  }
  set value(value: string) {
    value = typeof value == 'string' ? value : `${value}`;

    if (value.endsWith('px')) {
      this._value = parseInt(value, 10).toString();
    } else {
      this._value = hyphenate(value);
    }
  }
  private _value: string;

  readOnly = false;

  constructor(item: string | [string, string] | Record<string, any>) {
    if (typeof item == 'string') {
      this.name = item;
      this.value = CONST[item] ?? item;
    } else if (Array.isArray(item)) {
      const [name, value] = item;
      this.name = name;
      this.value = this._getValue(value);
    } else {
      const { name, value } = item;
      this.name = name;
      this.value = this._getValue(value);
    }
  }

  private _getValue(value: any) {
    if (isPlainObject(value)) {
      // side-effect
      this.readOnly = value.readOnly ?? false;
      return value.value;
    } else {
      return value;
    }
  }
}

export const toOption = (item: any) => new Option(item);

const optionsFactory = (
  collection: string | [string, string] | Option[] | Record<string, any>,
): OptionProps[] => {
  if (Array.isArray(collection) && collection.some((item: any) => item instanceof Option)) {
    return collection as OptionProps[];
  }
  if (isPlainObject(collection) || Array.isArray(collection)) {
    const items = isPlainObject(collection) ? Object.entries(collection) : collection;
    return (items as string[]).map(toOption);
  }
  return [toOption(collection)];
};

export const toOptions = (...collection: any[]): OptionProps[] => {
  return collection.reduce((acc: OptionProps[], item: string | Record<string, any> | string[]) => {
    acc.push(...optionsFactory(item));
    return acc;
  }, [] as OptionProps[]);
};
