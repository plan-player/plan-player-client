import { InputOverlayProps } from '../../UI/overlay/InputOverlay';
import { useEffect, useState } from 'react';
import { useAnimate } from 'framer-motion';
import { ActionFunctionArgs, useActionData } from 'react-router-dom';
import { fetchRequest } from '../../../util/request';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { getCategoryGroups } from '../../../util/categoryQueries';
import CategoryAddInput from './CategoryInputsComponents/CategoryAddInput';
import CategoryAddGroupsInput from './Groups/CategoryAddGroupsInput';
import CategoryAddColorsInput from './Colors/CategoryAddColorsInput';

export interface submitProps {
  (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>): void;
}

interface actionDataProps {
  status?: boolean;
  addColorStatus?: boolean;
}

const Wrapper = styled.div`
  @media screen and (min-width: 960px) {
    #backdrop {
      background-color: var(--white);
    }
  }
`;

const CategoryInputOverlay = ({ isOpen, setIsOpen, setHideNav }: InputOverlayProps) => {
  const [onGroups, setOnGroups] = useState(false);
  const [onColors, setOnColors] = useState(false);
  const [wrapper, setWrapper] = useAnimate();
  const [groups, setGroups] = useAnimate();
  const [colors, setColors] = useAnimate();
  const actionData = useActionData() as actionDataProps;
  const { data: categoryGroups, refetch: refreshCategoryGroups } = useQuery<any>(
    ['categoryGroups'],
    getCategoryGroups
  );

  const openAddGroups = () => {
    setHideNav(true);
    setOnGroups(true);
  };
  const closeAddGroups = () => {
    setOnGroups(false);
  };

  const openAddColors: submitProps = (event) => {
    event.preventDefault();
    setOnColors(true);
  };
  const closeAddColors = () => {
    setOnColors(false);
  };

  const closeHandler = () => {
    setIsOpen(false);
    setOnGroups(false);
    setOnColors(false);
  };

  useEffect(() => {
    if (actionData?.addColorStatus) {
      closeAddColors();
      refreshCategoryGroups();
    }
    if (actionData?.status) {
      window.location.reload();
    }
  }, [actionData]);

  useEffect(() => {
    if (onGroups) {
      setGroups(groups.current, {
        display: 'flex',
        opacity: 1,
      });
      setWrapper(wrapper.current, {
        opacity: 0.8,
      });
      setColors(colors.current, {
        display: 'none',
      });
    }

    if (onGroups && onColors) {
      setGroups(groups.current, {
        opacity: 0.8,
      });
      setColors(colors.current, {
        display: 'flex',
      });
    } else if (!onGroups && !onColors) {
      setGroups(groups.current, {
        display: 'none',
      });
      setColors(colors.current, {
        display: 'none',
      });
      setWrapper(wrapper.current, {
        opacity: 1,
      });
    }
  }, [onGroups, onColors]);

  return (
    <Wrapper>
      <CategoryAddInput
        refProps={wrapper}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setHideNav={setHideNav}
        openAddGroups={openAddGroups}
      />

      <CategoryAddGroupsInput
        refProps={groups}
        categoryGroups={categoryGroups}
        openAddColors={openAddColors}
        closeAddGroups={closeAddGroups}
        closeHandler={closeHandler}
      />

      <CategoryAddColorsInput refProps={colors} closeHandler={closeHandler} />
    </Wrapper>
  );
};

export default CategoryInputOverlay;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get('intent');

  if (intent == 'addColor') {
    const submission = {
      groupName: formData.get('groupName'),
      color: formData.get('color'),
    };
    try {
      await fetchRequest({
        url: '/api/category-groups',
        method: 'POST',
        body: submission,
      });

      return { addColorStatus: true };
    } catch {
      return { addColorStatus: false };
    }
  } else {
    try {
      const selectedCategoryId = formData.get('categoryId');
      const submission = {
        categoryName: formData.get('addCategory'),
        emoji: formData.get('emoji'),
        tags: formData.get('tag'),
      };

      await fetchRequest({
        url: `/api/categories/add/${selectedCategoryId}`,
        method: 'POST',
        body: submission,
      });

      return { status: true };
    } catch {
      return { status: false };
    }
  }
};
