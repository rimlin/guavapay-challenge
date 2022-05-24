import { useCallback, useMemo } from 'react';
import { stringify } from 'query-string';
import { useRouter } from 'next/router';

export type UpdateQueryParamsFn<T> = (params: Partial<T>) => void;

type ReturnValue<T> = [T, UpdateQueryParamsFn<T>];

export function useQueryParams<T>(defaultValues: T): ReturnValue<T> {
	const router = useRouter();

	const queryParams: T = useMemo(
		() => ({
			...defaultValues,
			...router.query
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}),
		[JSON.stringify(defaultValues), JSON.stringify(router.query)]
	);

	const updateQueryParams = (params: Partial<T>) => {
		router.push({
			search: stringify(
				{
					...queryParams,
					...params
				},
				{ skipNull: true, skipEmptyString: true }
			)
		});
	};

	return [queryParams, updateQueryParams];
}
